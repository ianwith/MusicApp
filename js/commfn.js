//定义一些通用方法，目前只在main中应用到，@2014.10.07
define(function(){
	var $pList = $('.play_list_panel'),
		$mask = $('.mask')

	function showPlayList(){
		$pList.removeClass('hidden');
		$mask.removeClass('hidden');
	}
	function hidePlayList(){
		$pList.addClass('hidden');
		$mask.addClass('hidden');
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
		switchFullScreen: switchFullScreen
	}
})