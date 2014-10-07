define(['analyser'], function(analyser){
	var canvas = document.getElementById('drawCanvas'),
		ctx = canvas.getContext('2d'),
		data,
		bar = [],
		barW = 24, //bar width
		capH = 24, //cap height
		num = 64, //bar 数量，resize后不会再去init，直接给个数
		capPosition = [], //cap 位置
		colors = ['190,238,169', '174,123,179', '247,245,206', '247,166,181', '173,211,225'],
		isInit = false;


	function _init(){
		for(var i = 0; i < num; i++){
			bar[i] = {
				w: barW,
				x: i * barW,
				h: 0,
				color: colors[Math.floor(Math.random() * colors.length)]
			};
			capPosition[i] = 0;
		} //初始化bar和capPosition数组
		isInit = true;
	}

	function draw(){
		if(isInit === false)
			_init();
		data = analyser.getData(); //返回是数组，这里不能在定义的时候就获取
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for(var i = 0; i < num; i++){
			if(bar[i].h == 0){
				bar[i].h = data[i*8];//i*8 频谱上拉开一定距离
			}
			else{
				if(bar[i].h <= data[i*8])
					bar[i].h += Math.ceil((data[i*8] - bar[i].h) / 2.4);//除法运算控制上升速度适中
				else
					bar[i].h -= Math.ceil((bar[i].h - data[i*8]) / 1.6);
			}
			bar[i].h = Math.floor(bar[i].h * 1.6);
			//乘法控制bar高度不会太低，向下取整让高度降低到小于1时取0，防止抖动
			ctx.fillStyle = 'rgba(' + bar[i].color + ', 1)';
			ctx.fillRect(bar[i].x, canvas.height - bar[i].h, bar[i].w, bar[i].h);//画bar
			if(capPosition[i] <= bar[i].h)
				capPosition[i] = bar[i].h;
			else
				capPosition[i]--;
			ctx.fillStyle = 'rgba(' + bar[i].color + ', 0.6)';
			ctx.fillRect(bar[i].x, canvas.height - capPosition[i] - capH, bar[i].w, capH);//画cap
		}
	}
	return {
		draw: draw
	}
})