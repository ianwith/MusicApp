//定义一些通用方法
define(function(){
	var $pList = $('.play_list_panel'),
		$mask = $('.mask'),
		$playBg = $('#playBg'),
		$canvas = $('#drawCanvas'),
		$cover = $('.cover'),
		$topBar = $('.top_bar'),
		$bottomBar = $('.bottom_bar')

	function showPlayList(){
		$pList.removeClass('hidden');
		$mask.removeClass('hidden');
	}
	function hidePlayList(){
		$pList.addClass('hidden');
		$mask.addClass('hidden');
	}
	function enableCanvas(){
		$cover.addClass('hidden');
		$playBg.removeClass('hidden');
		$canvas.removeClass('hidden');
		$topBar.removeClass('hidden');
		$bottomBar.removeClass('hidden');
	}
	function disableCanvas(){
		$topBar.addClass('hidden');
		$bottomBar.addClass('hidden');
		$cover.removeClass('hidden');
		$playBg.addClass('hidden');
		$canvas.addClass('hidden');
	}
	function switchFullScreen(){
		var fullElement = document.documentElement;
		if(document.fullscreenElement || document.webkitFullscreenElement){
			if(document.cancelFullScreen){
				document.cancelFullScreen();
			}
			else if(document.webkitCancelFullScreen){
				document.webkitCancelFullScreen();
			}
		}
		else{
			if(fullElement.requestFullScreen){
				fullElement.requestFullScreen();
			}
			else if(fullElement.webkitRequestFullScreen){
				fullElement.webkitRequestFullScreen();
			}
		}
	}
	return{
		showPlayList: showPlayList,
		hidePlayList: hidePlayList,
		enableCanvas: enableCanvas,
		disableCanvas: disableCanvas,
		switchFullScreen: switchFullScreen
	}
})