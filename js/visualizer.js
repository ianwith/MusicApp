define(['commfn', 'effect0', 'effect1'], function(commfn){
	var canvas = document.getElementById('drawCanvas'),
		$bg = $('#playBg'),
		effectList = [], //效果列表
		curEffectFlag = 0,
		effect = null, //对象，指示参数中的效果文件
		timer = null;
	function resizeCanvas(){ //设置画布宽高
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	function startDraw(){
		commfn.enableCanvas();
		if(!effect){
			setEffect(curEffectFlag);
		}
		callDraw();
	}
	function stopDraw(){//有用吗。。。
		if(timer){
			cancelAnimationFrame(timer);
		}
	}
	function callDraw(){
		timer = requestAnimationFrame(callDraw);
		effect.draw();
	}
	function setBg(num){
		$bg.removeClass();
		$bg.addClass('bg' + num);
	}
	function setEffect(num){
		effect = effectList[num];
		setBg(num);
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
	for(var i = 0; i < arguments.length - 1; i++){
		effectList[i] = arguments[i + 1];
	}
	//resize
	resizeCanvas();
	$(window).on('resize', function(){
		resizeCanvas();
	});
	return {
		startDraw: startDraw,
		stopDraw: stopDraw,
		nextEffect: nextEffect,
		preEffect: preEffect
	}
})