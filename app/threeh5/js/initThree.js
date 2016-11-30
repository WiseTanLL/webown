function myThree(father){
	if (typeof father != undefined){
		this._father = document.getElementById(father);
	}else{
		this._father = document.body;
	}
	this._width = this._father.offsetWidth;//长
	this._height = this._father.offsetHeight;//宽
	var that = this;
	this.objects = null;

	/**
	 * 初始化场景
	 * @return {[type]} [description]
	 */
	function initScene(){
		that._scene = new THREE.Scene();
	}

	/**
	 * 初始化相机
	 * @return {[type]} [description]
	 */
	function initCamera(){
		var _camera = new THREE.PerspectiveCamera( 45, that._width/that._height, 1, 1000 );
		_camera.position.x = 0;
		_camera.position.y = 1000;
		_camera.position.z = 0;
		_camera.up.x = 0;
		_camera.up.y = 0;
		_camera.up.z = 1;
		_camera.lookAt({
			x: 0,
			y: 0,
			z: 0
		});
		that._camera = _camera;
	}

	/**
	 * 初始化灯光
	 * @return {[type]} [description]
	 */
	function initLight(){
		var _light = new THREE.DirectionalLight( 0xff0000, 1.0,0 );
		_light.position.set(100,100,200);
		that._scene.add(_light);
		that._light = _light;
	}

	/**
	 * 初始化object
	 * @return {[type]} [description]
	 */
	
	function initObject(){
		var geometry = new THREE.Geometry(),
        	material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors} );
            var color1 = new THREE.Color( 0x444444 ), color2 = new THREE.Color( 0xFF0000 );
            
            // 线的材质可以由2点的颜色决定
           	var p1 = new THREE.Vector3( -100, 0, 100 ),
                p2 = new THREE.Vector3(  100, 0, -100 );
            geometry.vertices.push(p1);
            geometry.vertices.push(p2);
            geometry.colors.push( color1, color2 );

           	var line = new THREE.Line( geometry, material, THREE.LinePieces );
           	that._scene.add(line);
	}

	/**
	 * 初始化渲染器
	 * @return {[type]} [description]
	 */
	function initRender(){
		var _renderer = new THREE.WebGLRenderer( {
			antialias: true
		} );
		_renderer.setSize(that._width,that._height);
		$('#canvas-area').append(_renderer.domElement);
		_renderer.setClearColor(0xffffff,1.0);
		that._renderer = _renderer;
	}

	/**
	 * 循环渲染操作
	 * @return {[type]} [description]
	 */
	function render(){
		that._renderer.clear();
		that._renderer.render(that._scene,that._camera);
		requestAnimationFrame(render);
	}

	/**
	 * 初始化Three操作
	 * @return {[type]} [description]
	 */
	this.init = function(){
		initScene();//初始化场景
		initCamera();//初始化相机
		initLight();//初始化灯光
		if (that.objects && typeof that.objects == 'function'){
			that.objects();
		}else{
			initObject();//初始化场景中的物体
		}
		initRender();//初始化渲染器
		render();//开始渲染
	}
}