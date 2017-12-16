const scenes = [];

const canvasS = document.getElementById( "c" );

const template = document.getElementById('template').text;
const content = document.getElementById('content');
template.height = window.innerHeight;
// const obj = document.getElementById('obj');

// let objHalfX = obj.offsetWidth / 2;
// let objHalfY = obj.offsetHeight / 2;

const geometries = [
    new THREE.BoxGeometry( 1, 1, 1 ),
    new THREE.SphereGeometry( 0.5, 12, 8 ),
    new THREE.DodecahedronGeometry( 0.5 ),
    new THREE.CylinderGeometry( 0.5, 0.5, 1, 12 )
];

animate();


for ( let i =  0; i < 10; i ++ ) {
    const sceneS = new THREE.Scene();
    // make a list item
    const element = document.createElement( "div" );
    element.className = "list-item";
    element.innerHTML = template.replace( '$', i + 1 );
    // Look up the element that represents the area
    // we want to render the scene
    sceneS.userData.element = element.querySelector( ".scene" );
    content.appendChild( element );
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0.85, 1.5);
    sceneS.userData.camera = camera;

    // add one random mesh to each scene
    const geometry = geometries[ geometries.length * Math.random() | 0 ];
    const material = new THREE.MeshStandardMaterial( {
        color: new THREE.Color().setHSL( Math.random(), 1, 0.75 ),
        roughness: 0.5,
        metalness: 0,
        flatShading: true
    } );
    sceneS.add( new THREE.Mesh( geometry, material ) );
    sceneS.add( new THREE.HemisphereLight( 0xaaaaaa, 0x444444 ) );
    const light = new THREE.DirectionalLight( 0xffffff, 0.5 );
    light.position.set( 1, 15, 1 );
    sceneS.add( light );
    scenes.push( sceneS );
    console.log(sceneS);
}

const rendererS = new THREE.WebGLRenderer( { canvas: canvasS, antialias: true } );
rendererS.setClearColor( 0xffffff, 1 );
rendererS.setPixelRatio( window.devicePixelRatio );

function animate() {
    requestAnimationFrame(animate);

    scenes.forEach( function( sceneS ) {
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
        rendererS.render(sceneS, camera);
    })
}

// function updateSize() {
//     const width = canvasS.clientWidth;
//     const height = canvasS.clientHeight;
//     if ( canvasS.width !== width || canvasS.height != height ) {
//         rendererS.setSize( width, height, false );
//     }
// }


// function animate() {
//     render();
//     requestAnimationFrame( animate );
// }
// function animate() {
//     render();
//     requestAnimationFrame( animate );
// }
// function render() {
//     updateSize();
//     rendererS.setClearColor( 0xffffff );
//     rendererS.setScissorTest( false );
//     rendererS.clear();
//     rendererS.setClearColor( 0xe0e0e0 );
//     rendererS.setScissorTest( true );
//     scenes.forEach( function( sceneS ) {
//         // so something moves
//         sceneS.children[0].rotation.y = Date.now() * 0.001;
//         // get the element that is a place holder for where we want to
//         // draw the scene
//         const element = sceneS.userData.element;
//         // get its position relative to the page's viewport
//         const rect = element.getBoundingClientRect();
//         // check if it's offscreen. If so skip it
//         if ( rect.bottom < 0 || rect.top  > rendererS.domElement.clientHeight ||
//             rect.right  < 0 || rect.left > rendererS.domElement.clientWidth ) {
//             return;  // it's off screen
//         }
//         // set the viewport
//         const width  = rect.right - rect.left;
//         const height = rect.bottom - rect.top;
//         const left   = rect.left;
//         const top    = rect.top;
//         rendererS.setViewport( left, top, width, height );
//         rendererS.setScissor( left, top, width, height );
//         const camera = sceneS.userData.camera;
//         //camera.aspect = width / height; // not changing in this example
//         //camera.updateProjectionMatrix();
//         //scene.userData.controls.update();
//         rendererS.render( sceneS, camera );
//     } );
// }