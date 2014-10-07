// 程序入口
require(['commfn', 'visualizer'], function(commfn, visualizer){
	var $body = $('body'),
		$doc = $(document),
		$clickToAddFile = $('#clickToAddFile'),
		$uploadFile = $('#uploadFile'),
		uploadFile = document.getElementById('uploadFile'), //dom对象
		$playListPanel = $('.play_list_panel'),
		$addSong = $('.add_song'), //添加按钮
		$musicTitle = $('.music_info_title'), //歌曲标题
		$playList = $('.play_list'), //歌曲播放列表
		$bottomBar = $('.bottom_bar'),
		audio = document.getElementById('audio'), //dom对象
		fileList = [], //添加的音乐文件列表
		fileNameList = [], //文件名的列表，与上对应
		reader = new FileReader(),
		curSong = -1,
		isPlaying = false,
		isPLshow = false;

	//读取文件加载完之后
	reader.onload = function(){
		var audioData = event.target.result;
		audio.src = audioData;
		audio.play();
	}
	//音乐播放完毕
	audio.addEventListener('ended', function(){
		playNext();
	}, false);
	//触发上传文件按钮
	$clickToAddFile.add($addSong).on('click', function(){
		$uploadFile.click();
	});
	//检测到有文件上传
	$uploadFile.on('change', function(){
		appendFile(uploadFile.files);
		if(isPlaying == false){
			curSong++;
			playThisSong(curSong);
			isPlaying = true;
			visualizer.startDraw();
		}
	});
	//文件拖拽监听
	$doc.on('drop', function(){
		event.stopPropagation();
		event.preventDefault();
		appendFile(event.dataTransfer.files);
		if(isPlaying == false){
			curSong++;
			playThisSong(curSong);
			isPlaying = true;
			visualizer.startDraw();
		}
	}).on('dragenter', function(){
		event.preventDefault();
		event.stopPropagation();
	}).on('dragover', function(){
		event.preventDefault();
		event.stopPropagation();
		event.dataTransfer.dropEffect = 'copy';
	});
	//键盘事件
	$doc.on('keydown', function(){
		switch(event.keyCode){
			case 32: togglePause(); break;
			case 39: visualizer.nextEffect(); break;
			case 37: visualizer.preEffect(); break;
		}
	})
	//绑定一些点击操作事件
	$body.on('click', '.icon_full_screen', function(){
		commfn.switchFullScreen();
	}).on('click', '.icon_play_list', function(){
		commfn.showPlayList();
		isPLshow = true;
	}).on('click', '.mask', function(){
		if(isPLshow == true){
			//$(event.target) != $playListPanel  这样比较永远都是true，因为是两个不同的实例，坑爹啊！
			if(event.target != $playListPanel.get(0)){
				commfn.hidePlayList();
				isPLshow = false;
			}
		}
	}).on('click', '.icon_pause, .icon_playAgain', function(){
		togglePause();
	}).on('click', '.icon_nextSong', function(){
		playNext();
	}).on('contextmenu', function(){
		if(isPlaying == true){
			event.preventDefault();
			if(isPLshow == false){
				commfn.showPlayList();
				isPLshow = true;
			}
			else{
				commfn.hidePlayList();
				isPLshow = false;
			}			
		}
	});
	//点击列表监听
	$playList.on('click', 'li', function(){
		playThisSong($(this).attr('num'));
		commfn.hidePlayList();
		isPLshow = false;
	})
	//添加文件，只是加到列表中，不播放
	function appendFile(files){
		var fLen = files.length,
			acceptFileType = 'audio',
			listAdds = '';
		for(var i = 0; i < fLen; i++){
			if(files[i].type.indexOf(acceptFileType) == 0){
				fileList.push(files[i]);
				var fileName = files[i].name.replace(/\.[0-9a-zA-Z]+$/, '');//去文件名
				fileNameList[i] = fileName;
				listAdds += '<li num="' + (fileList.length - 1) + '" class="play_list_item">'
							+ '<span class="play_list_item_info">' + fileNameList[i] + '</span>'
							+ '</li>';
			}
		}
		$playList.append($(listAdds));
	}
	//播放特定的歌曲
	function playThisSong(num){
		if(curSong != num)
			curSong = num;
		var $iconPlaying = $('<span class="play_list_item_playing"></span>');
		var $iconPlayingBar = $('<span class="icon_playing_bar"></span>'
			+ '<span class="icon_playing_bar"></span>'
			+ '<span class="icon_playing_bar"></span>'
			+ '<span class="icon_playing_bar"></span>');//创建播放icon节点
		//文件读取器读取文件
		reader.readAsDataURL(fileList[curSong]);
		$('.play_list_item').each(function(){
			var $preRemove = $(this).find('.play_list_item_playing');//判断有无icon
			if($(this).attr('num') == curSong){
				$iconPlaying.append($iconPlayingBar);
				if($preRemove.length <= 0)
					$(this).append($iconPlaying);
				$(this).addClass('playing');//这类暂时没有样式
				var songName = $(this).text();
				$musicTitle.text(songName);
			}
			else{
				if($preRemove.length > 0)
					$preRemove.remove();
				$(this).removeClass('playing');
			}
		});
	}
	//暂停键切换
	function togglePause(){
		if(isPlaying == false){
			audio.play();
			isPlaying = true;
			$bottomBar.find('.icon_playAgain').removeClass('icon_playAgain').addClass('icon_pause');
		}
		else{
			audio.pause();
			isPlaying = false;
			$bottomBar.find('.icon_pause').removeClass('icon_pause').addClass('icon_playAgain');
		}
	}
	//播放下一首
	function playNext(){
		if(fileList.length != 0){
			curSong = (curSong + 1) % fileList.length;
			playThisSong(curSong);
		}
	}
	function stopPlay(){//暂时没用到。。。
		visualizer.stopDraw();
		audio.pause();
	}
})