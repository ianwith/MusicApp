define(['effect0', 'effect1', 'effect2'], function(){
	var canvas = document.getElementById('drawCanvas'),
		$canvas = $('#drawCanvas'),
		$playBg = $('#playBg'),
		$cover = $('.cover'),
		$topBar = $('.top_bar'),
		$bottomBar = $('.bottom_bar'),
		effectList = [], //效果列表
		curEffectFlag = 0,
		effect = null, //对象，指示参数中的效果文件
		isPlaying = false, //好像没特别用到
		timer = null;
	function resizeCanvas(){ //设置画布宽高
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	function enableDraw(){
		$cover.addClass('hidden');
		$playBg.removeClass('hidden');
		$topBar.removeClass('hidden');
		$bottomBar.removeClass('hidden');
		$canvas.removeClass('hidden');
	}
	function initV(){
		resizeCanvas();
		enableDraw();
		!effect && setEffect(curEffectFlag);
	}
	function stopDraw(){
		cancelAnimationFrame(timer);
		isPlaying = false;
	}
	function callDraw(){
		timer = requestAnimationFrame(callDraw);
		isPlaying = true;
		effect.draw();
	}
	function setBg(num){
		$playBg.removeClass();
		$playBg.addClass('bg' + num);
	}
	function setEffect(num){
		if(effect){
			stopDraw();
		}
		effect = effectList[num];
		setBg(num);
		callDraw();
	}
	function nextEffect(){
		curEffectFlag++;
		curEffectFlag = curEffectFlag % effectList.length;
		setEffect(curEffectFlag);
	}
	function preEffect(){
		curEffectFlag--;
		if(curEffectFlag < 0){
			curEffectFlag += effectList.length;
		}
		setEffect(curEffectFlag);
	}
	//效果参数赋值到数组中
	for(var i = 0; i < arguments.length; i++){
		effectList[i] = arguments[i];
	}
	//onresize
	$(window).on('resize', function(){
		resizeCanvas();
	});
	return {
		initV: initV,
		nextEffect: nextEffect,
		preEffect: preEffect
	}
})