define(['analyser'], function(analyser){
	var canvas = document.getElementById('drawCanvas'),
		ctx = canvas.getContext('2d'),
		data,
		isInit = false,
		circle = [],
		colors = ['49,75,130', '58,150,153', '130,152,153', '229,73,112', '246,235,119']

	function _init(){
		var len = analyser.getFreqBinCount();
		for(var i = 0; i < len; i++){
			circle[i] = {
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				color: colors[Math.floor(Math.random() * colors.length)],
				radius: 0,
				opacity: Math.random()
			}
		}
		isInit = true;
	}

	function draw(){
		if(isInit === false)
			_init();
		data = analyser.getData();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for(var i = 0; i < data.length; i = i + 20){
			if(circle[i].radius == 0){
				circle[i].radius = data[i];
			}
			else{
				if(circle[i].radius < data[i]){
					circle[i].radius += Math.floor((data[i] - circle[i].radius) / 6);
					circle[i].opacity += 0.024;
					(circle[i].opacity > 1) && (circle[i].opacity = 1);
				}
				else{
					circle[i].radius -= Math.floor((circle[i].radius - data[i]) / 6);
					circle[i].opacity -= 0.02;
					if(data[i] == 0){
						circle[i].opacity = 0;
					}
					if(circle[i].opacity < 0){
						circle[i].opacity = 0;
						circle[i].x = Math.random() * canvas.width;
						circle[i].y = Math.random() * canvas.height;
					}
				}
			}
			ctx.fillStyle = 'rgba(' + circle[i].color + ',' + circle[i].opacity + ')';
			ctx.beginPath();
			ctx.arc(circle[i].x, circle[i].y, circle[i].radius, 0, Math.PI * 2, false);
			ctx.closePath();
			ctx.fill();
		}
	}
	return{
		draw: draw
	}
})