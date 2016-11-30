$(function(){
	var mt = new myThree('canvas-area');
	mt.objects = function(){
		var geometry = new THREE.Geometry(),
        	material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors} );
            var color1 = new THREE.Color( 0x444444 ), color2 = new THREE.Color( 0xFF0000 );
            
            // 线的材质可以由2点的颜色决定
           	var p1 = new THREE.Vector3( -200, 0, 100 ),
                p2 = new THREE.Vector3(  100, 0, -200 );
            geometry.vertices.push(p1);
            geometry.vertices.push(p2);
            geometry.colors.push( color1, color2 );

           	var line = new THREE.Line( geometry, material, THREE.LinePieces );
           	mt._scene.add(line);
	}
	mt.init();
})