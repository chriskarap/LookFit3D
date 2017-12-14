const URL = {
    female: './models/female_objs/female/'
};

const clothes = [
    // {
    //     url: './models/female_objs/blue_jeans/',
    //     obj: 'Blue_Jeans.obj',
    //     mtl: 'Blue_Jeans.mtl',
    //     type: 'trousers'
    // },
    // {
    //     url: './models/female_objs/dark_blue_jeans/',
    //     obj: 'dark_blue_jeans.obj',
    //     mtl: 'dark_blue_jeans.mtl',
    //     type: 'trousers'
    // },
    {
        url: './models/female_objs/shorts/',
        obj: 'shortik.obj',
        mtl: 'shortik.mtl',
        type: 'shorts'
    },
    // {
    //     url: './models/female_objs/dress/',
    //     obj: 'dress.obj',
    //     mtl: 'dress.mtl',
    //     type: 'dress'
    // },
    // {
    //     url: './models/female_objs/jacket_blue/',
    //     obj: 'jacket_blue.obj',
    //     mtl: 'jacket_blue.mtl',
    //     type: 'jacket'
    // },
    // {
    //     url: './models/female_objs/jacket_black/',
    //     obj: 'jacket_black.obj',
    //     mtl: 'jacket_black.mtl',
    //     type: 'jacket'
    // }
];

const view = document.getElementById('model');
view.height = window.innerHeight;

let windowHalfX = view.offsetWidth / 2;
let windowHalfY = view.offsetHeight / 2;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, view.offsetWidth / view.offsetHeight, 0.1, 1000);
camera.position.set(0, 0.9, 1.5);

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
    windowHalfX = view.offsetWidth / 2;
    windowHalfY = view.offsetHeight / 2;
    camera.aspect = view.offsetWidth / view.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(view.offsetWidth, view.offsetHeight);
}

const person = new Person();

// let female = null;
loadObj(URL.female, 'female.obj', 'female.mtl').then((model) => {
    // female = model;
    model.position.y = -0.9;
    person.add(model);
});

for (let i = 0; i < clothes.length; i++) {
    loadObj(clothes[i].url, clothes[i].obj, clothes[i].mtl).then((model) => {
        model.position.y = -0.9;
        model.children[0].material.side = THREE.DoubleSide;
        person.add(model);
    });
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();