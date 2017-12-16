const URL = {
    female: './models/female_objs/female/'
};

const view = document.getElementById('model');
// view.height = window.innerHeight;

let viewHalfX = view.offsetWidth / 2;
let viewHalfY = view.offsetHeight / 2;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, view.offsetWidth / view.offsetHeight, 0.1, 1000);
camera.position.set(0, 0.85, 1.5);

const lightAmbient = new THREE.AmbientLight(0xdcdcdc, 0.8);
scene.add(lightAmbient);

const light1 = new THREE.DirectionalLight(0xFFFFFF, 0.5);
light1.position.set(-1.6, 2.5, 3);
scene.add(light1);

const light2 = new THREE.DirectionalLight(0xFFFFFF, 0.1);
light2.position.set(1.6, 0.6, 2.5);
scene.add(light2);

const renderer = new THREE.WebGLRenderer({alpha: true, antialias : true});
renderer.setSize(view.offsetWidth, view.offsetHeight);
view.appendChild(renderer.domElement);

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    viewHalfX = view.offsetWidth / 2;
    viewHalfY = view.offsetHeight / 2;
    camera.aspect = view.offsetWidth / view.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(view.offsetWidth, view.offsetHeight);
}

const person = new Person();

loadObj(URL.female, 'female.obj', 'female.mtl').then((model) => {
    model.position.y = -0.9;
    person.add(model);
});

for (let i = 0; i < clothes_list.length; i++) {
    if(clothes_list[i].visible)
    loadObj(clothes_list[i].url, clothes_list[i].obj, clothes_list[i].mtl).then((model) => {
        model.position.y = -0.9;
        model.children[0].material.side = THREE.DoubleSide;
        person.add(model);
    });
}
//
// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// }
//
// animate();