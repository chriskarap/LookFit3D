const createScene = (model, view, cameraPos) => {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, view.offsetWidth / view.offsetHeight, 0.1, 100);
    camera.position.copy(cameraPos);

    scene.add(model);

    const lightAmbient = new THREE.AmbientLight(0xdcdcdc, 0.8);
    scene.add(lightAmbient);
    const light1 = new THREE.DirectionalLight(0xFFFFFF, 0.5);
    light1.position.set(-1.6, 2.5, 3);
    scene.add(light1);
    const light2 = new THREE.DirectionalLight(0xFFFFFF, 0.1);
    light2.position.set(1.6, 0.6, 2.5);
    scene.add(light2);

    const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setSize(view.offsetWidth, view.offsetHeight);
    view.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
        camera.aspect = view.offsetWidth / view.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(view.offsetWidth, view.offsetHeight);
    }

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
};
