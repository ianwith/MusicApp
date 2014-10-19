define(['analyser'], function(analyser){
	var camera, scene, renderer,
		particles = [], material,
		AMOUNTX = 100, AMOUNTZ = 50, SEPARATION = 100,//间隔
		mouseX = 0, mouseY = 0,
		windowHalfX = window.innerWidth / 2,
		windowHalfY = window.innerHeight / 2,
		PI2 = Math.PI * 2,
		count = 0,
		ph = 50, // 粒子高度（振幅）
		data,
		isInit = false,
		canvas = document.getElementById('drawCanvas');

	function _init(){
		camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);
		camera.position.z = 1000;
		camera.position.y = 200;
		scene = new THREE.Scene();

		material = new THREE.SpriteCanvasMaterial({
			color: 0xffffff,
			program: function(context){
				context.fillStyle = "#ffffff"; //不然第一次切换过去是黑的 O.O
				context.beginPath();
				context.arc(0, 0, 0.5, 0, PI2, true);
				context.fill();
			}
		})
		var i = 0;
		for(var ix = 0; ix < AMOUNTX; ix++){
			for(var iz = 0; iz < AMOUNTZ; iz++){
				i++;
				particles[i] = new THREE.Sprite(material);
				particles[i].position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
				particles[i].position.z = iz * SEPARATION - ((AMOUNTZ * SEPARATION) / 2);
				scene.add(particles[i]);
			}
		}

		renderer = new THREE.CanvasRenderer({
			canvas: canvas
		});
		renderer.setSize(window.innerWidth, window.innerHeight);

		document.addEventListener('mousemove', onMouseMove, false);
		document.addEventListener('keydown', onKeyDown, false);
		window.addEventListener('resize', onWindowResize, false);
		isInit = true;
	}

	function onMouseMove(){
		mouseX = event.clientX - windowHalfX;
		mouseY = event.clientY - windowHalfY;
	}
	function onKeyDown(){ //同effect2
		renderer.setSize(window.innerWidth, window.innerHeight);
	}
	function onWindowResize(){
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	function draw(){
		if(isInit === false)
			_init();
		data = analyser.getData();
		var total = 0,
			avg = 0;
		for(var i = 0; i < data.length; i++){
			total += data[i];
		}
		avg = Math.ceil(total / data.length);
		(avg < 20) && (avg = 20); //平均值最低值，防止舒缓音乐没啥起伏
		(avg > 70) && (avg = avg * 0.8); //防止激情音乐振动太大
		(avg > ph) ? (ph += Math.floor((avg - ph) / 2)) : (ph -= Math.floor((ph - avg) / 2));

		var i = 0;
		for(var ix = 0; ix < AMOUNTX; ix++){
			for(var iz = 0; iz < AMOUNTZ; iz++){
				i++;
				particles[i].position.y = ( Math.sin((ix + count) * 0.3) + Math.sin((iz + count) * 0.5) ) * ph;
				particles[i].scale.x = particles[i].scale.y = (Math.sin((ix + count) * 0.3) + 1) * 4 +
															(Math.sin((iz + count) * 0.5) + 1) * 4;
			}
		}

		camera.position.x += ( mouseX - camera.position.x ) * 0.05;
		camera.position.y += ( -mouseY + 200 - camera.position.y ) * 0.04;
		camera.lookAt(scene.position);

		renderer.render(scene, camera);

		count += 0.006 * avg; //步数，根据avg不同而不同，直观的表现为波动快慢
	}

	return{
		draw: draw
	}
})