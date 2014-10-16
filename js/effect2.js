define(['analyser'], function(analyser){
	var camera, scene, renderer, group, particle, material,
		mouseX = 0, mouseY = 0,
		windowHalfX = window.innerWidth / 2,
		windowHalfY = window.innerHeight / 2,
		PI2 = Math.PI * 2,
		data,
		isInit = false,
		canvas = document.getElementById('drawCanvas'),
		colors = ['#b5ef9b', '#65d97d', '#fbd5ac', '#c3bed4', '#eeeeff', /* '#fbee83', */
				  '#ff788b', '#bf4572', '#4e7da6', '#b4dbd4', '#68bcdd'];

		function _init(){
			camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
			camera.position.z = 1000;
			scene = new THREE.Scene();
			group = new THREE.Object3D();
			scene.add(group);

			for(var i = 0; i < 200; i++){
				material = new THREE.SpriteCanvasMaterial({
					color: colors[Math.floor(Math.random() * colors.length)],
					opacity: 0.9,
					program: function(context){
						context.fillRect(-0.4, -0.4, 0.8, 0.8);
					}
				});
				particle = new THREE.Sprite(material);
				particle.position.x = Math.random() * 2000 - 1000;
				particle.position.y = Math.random() * 2000 - 1000;
				particle.position.z = Math.random() * 2000 - 1000;
				particle.scale.x = particle.scale.y = Math.random() * 20;
				group.add(particle);
			}

			renderer = new THREE.CanvasRenderer({
				canvas: canvas
			});
			renderer.setSize(window.innerWidth, window.innerHeight);

			document.addEventListener('mousemove', onMouseMove, false);
			document.addEventListener('mousewheel', onMouseWheel, false);
			document.addEventListener('keydown', function(){
				camera.position.z = 1000;
			}, false);
			window.addEventListener('resize', onWindowResize, false);
			isInit = true;
		}

		function onMouseMove(){
			mouseX = event.clientX - windowHalfX;
			mouseY = event.clientY - windowHalfY;
		}
		function onMouseWheel(){
			event.preventDefault();
			event.stopPropagation();
			var delta = event.wheelDelta / 12;
			camera.position.z -= delta;
			if(camera.position.z < 50) camera.position.z = 50;
			if(camera.position.z > 3000) camera.position.z = 3000;
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

			for(var i = 0; i < group.children.length; i++){
				var radius = group.children[i].scale.x;
				if(radius < data[i])
					radius += Math.floor((data[i] - radius) / 3);
				else
					radius -= Math.floor((radius - data[i]) / 1);
				group.children[i].scale.x = group.children[i].scale.y = radius;
			}

			camera.position.x += ( mouseX - camera.position.x ) * 0.05;
			camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
			camera.lookAt(scene.position);

			group.rotation.x += 0.005;
			group.rotation.y += 0.005;

			renderer.render(scene, camera);
		}

		return{
			draw: draw
		}
})