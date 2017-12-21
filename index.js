const avatarURL = {
    female: {
        type: 'female',
        url: './models/female_objs/female/',
        obj: 'female.obj',
        mtl: 'female.mtl'
    }
};

let avatarReady = false;

function init() {
    const header = document.getElementById('header');
    const avatarView = document.getElementById('model');
    const contextHeight = (avatarView.offsetHeight - header.offsetHeight) + 'px';

    avatarView.style.height = contextHeight;

    const c = document.getElementById('myCanvas');
    const ctx = c.getContext("2d");
    const my_gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    my_gradient.addColorStop(0, "#f4f4f4");
    my_gradient.addColorStop(0.4, "#FFF");
    my_gradient.addColorStop(0.6, "#FFF");
    my_gradient.addColorStop(1, "#dcdcdc");
    ctx.fillStyle = my_gradient;
    ctx.fillRect(0, 0, avatarView.offsetWidth, avatarView.offsetHeight);

    /////////////////////////////
    const avatarControllerObj = new ControllerObj(avatarView);

    loadObj(avatarURL.female.url, avatarURL.female.obj, avatarURL.female.mtl).then((model) => {
        avatarControllerObj.avatar = avatarURL.female.type;
            avatarControllerObj.add(model);
        avatarControllerObj.setModelSize(model);
        createScene(avatarControllerObj, avatarView, {x: 0, y: 0, z: 7.5});

        avatarReady = true;
    });

    ///////////////////
    const clothesView = document.getElementById('clothes');
    clothesView.style.height = contextHeight;
    const template = document.getElementById('template').text;
    const clothes = [];
    const elemClassName = 'cloth';

    for (let i = 0; i < clothes_list.length; i++) {
        const element = document.createElement("div");
        element.classList += ' row';
        element.classList += ' disableSelection';
        element.setAttribute('data-index', elemClassName + (i));
        element.innerHTML = template;
        element.getElementsByTagName('h5')[0].innerHTML = clothes_list[i].title;
        element.getElementsByTagName('span')[0].innerHTML = clothes_list[i].createBy;
        clothesView.appendChild(element);
        clothes.push(element);

        const objView = element.querySelector(".obj");
        const clothesControllerObj = new ControllerObj(objView);

        loadObj(clothes_list[i].url, clothes_list[i].obj, clothes_list[i].mtl).then((model) => {
            clothesControllerObj.add(model);
            clothesControllerObj.setModelSize(model);

            createScene(clothesControllerObj, objView, {x: 0, y: 0, z: 1.4});
        });
    }

    clothes.forEach((elem) => {
        elem.addEventListener('mousedown', (event) => {
            if (!avatarReady) return;
            this.buttonDownTime = Date.now();
        });

        elem.addEventListener('mouseup', (event) => {
            if (Date.now() - this.buttonDownTime < 200) {
                const elemIndex = elem.getAttribute('data-index').toString();
                const index = elemIndex.replace(elemClassName, '');
                const item = clothes_list[index];
                ClothesFitting(item, avatarControllerObj);
            }
        })
    });


}

init();