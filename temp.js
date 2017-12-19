let canvasS, obj;
let content;
let scenesArr = [], rendererS;

init();
animateS();

function init() {
    canvasS = document.getElementById("c");
    obj = document.getElementById("obj");

    const geometries = [
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.SphereGeometry(0.5, 12, 8),
        new THREE.DodecahedronGeometry(0.5),
        new THREE.CylinderGeometry(0.5, 0.5, 1, 12)
    ];

    const template = document.getElementById('template').text;
    content = document.getElementById('content');

    // template.height = window.innerHeight;

    for (let i = 0; i < 2; i++) {
        const sceneS = new THREE.Scene();

        // make a list item
        const element = document.createElement("div");
        element.className = "list-item";
        element.innerHTML = template.replace('$', i + 1);

        // Look up the element that represents the area
        // we want to render the scene
        sceneS.userData.element = element.querySelector(".scene");
        content.appendChild(element);
        const camera = new THREE.PerspectiveCamera( 50, 1, 1, 10 );
        camera.position.z = 2;
        sceneS.userData.camera = camera;

        // add one random mesh to each scene
        const geometry = geometries[geometries.length * Math.random() | 0];
        const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(Math.random(), 1, 0.75),
            roughness: 0.5,
            metalness: 0,
            flatShading: true
        });
        sceneS.add(new THREE.Mesh(geometry, material));
        sceneS.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444));

        const light = new THREE.DirectionalLight(0xffffff, 0.5);
        light.position.set(1, 15, 1);
        sceneS.add(light);
        scenesArr.push(sceneS);
    }

    rendererS = new THREE.WebGLRenderer({canvas: canvasS, alpha: true, antialias: true});
    rendererS.setClearColor(0xffffff, 1);
    rendererS.setSize(obj.offsetWidth, obj.offsetHeight);
    rendererS.setPixelRatio(window.devicePixelRatio);
    // content.appendChild(rendererS.domElement);
}


function updateSize() {
    // const width = content.offsetWidth;
    // const height = content.offsetHeight;
    // if ( content.offsetWidth !== width || content.offsetHeight != height ) {
    //     rendererS.setSize( width, height, false );
    // }
    const width = obj.offsetWidth;
    const height = obj.offsetHeight;
    if ( obj.width !== width || obj.height != height ) {
        renderer.setSize(obj.offsetWidth, obj.offsetHeight);
    }
}

function animateS() {
    render1();
    requestAnimationFrame( animateS );
}

function render1() {
    // updateSize();
    rendererS.setClearColor( 0xffffff );
    rendererS.setScissorTest( false );
    rendererS.clear();
    rendererS.setClearColor( 0xe0e0e0 );
    rendererS.setScissorTest( true );
    scenesArr.forEach( function( sceneS ) {
        // so something moves
        sceneS.children[0].rotation.y = Date.now() * 0.001;
        // get the element that is a place holder for where we want to
        // draw the scene
        const element = sceneS.userData.element;
        // get its position relative to the page's viewport
        const rect = element.getBoundingClientRect();
        // check if it's offscreen. If so skip it
        if ( rect.bottom < 0 || rect.top  > rendererS.domElement.clientHeight ||
            rect.right  < 0 || rect.left > rendererS.domElement.clientWidth ) {
            return;  // it's off screen
        }
        // set the viewport
        const width  = rect.right - rect.left;
        const height = rect.bottom - rect.top;
        const left   = rect.left;
        const top    = rect.top;
        rendererS.setViewport( left, top, width, height );
        rendererS.setScissor( left, top, width, height );
        const camera = sceneS.userData.camera;
        //camera.aspect = width / height; // not changing in this example
        //camera.updateProjectionMatrix();
        //scene.userData.controls.update();
        rendererS.render( sceneS, camera );
    } );
}