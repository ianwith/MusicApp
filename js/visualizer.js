define(['effect0', 'effect1', 'effect2', 'effect3'], function(){
    var canvas = document.getElementById('drawCanvas'),
        $canvas = $('#drawCanvas'),
        $playBg = $('#playBg'),
        $cover = $('.cover'),
        $topBar = $('.top_bar'),
        $bottomBar = $('.bottom_bar'),
        $help_prompt = $('.help_prompt'),
        effectList = [], //效果列表
        curEffectFlag = 0,
        effect = null, //对象，指示参数中的效果文件
        isPlaying = false, //好像没特别用到
        timer = null;
    function resizeCanvas(){ //设置画布宽高
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        canvas.width = window.innerWidth * window.devicePixelRatio;
        canvas.height = window.innerHeight * window.devicePixelRatio;
    }
    function enableDraw(){
        $cover.addClass('hidden');
        $playBg.removeClass('hidden');
        $canvas.removeClass('hidden');
        $topBar.add($bottomBar).removeClass('hidden').css('opacity', 0.6);
        setTimeout(function(){
            $topBar.add($bottomBar).animate({opacity: 0}, 1000, 'linear', function(){
                $(this).removeAttr('style');
            });
        }, 1500);
        if(localStorage.getItem('playtimes') === '1'){
            $help_prompt.removeClass('hidden');
            setTimeout(function(){
                $help_prompt.fadeOut(3000);
            }, 3000);
        }
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
    //localStorage计数
    if(!localStorage.getItem('playtimes')){
        localStorage.setItem('playtimes', 0);
    }
    localStorage.playtimes = parseInt(localStorage.getItem('playtimes')) + 1;
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