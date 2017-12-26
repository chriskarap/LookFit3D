const clothes = [];
let avatarReady = false;
let avatarControllerObj = null;

const avatarContainer = () => {
    const avatarURL = {
        female: {
            type: 'female',
            url: './models/female_objs/female/',
            obj: 'female.obj',
            mtl: 'female.mtl'
        }
    };

    const avatarView = document.getElementById('model');

    const c = document.getElementById('myCanvas');
    const ctx = c.getContext("2d");
    const my_gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    my_gradient.addColorStop(0, "#f4f4f4");
    my_gradient.addColorStop(0.4, "#FFF");
    my_gradient.addColorStop(0.6, "#FFF");
    my_gradient.addColorStop(1, "#dcdcdc");
    ctx.fillStyle = my_gradient;
    ctx.fillRect(0, 0, avatarView.offsetWidth, avatarView.offsetHeight);

    avatarControllerObj = new ControllerObj(avatarView);

    loadObj(avatarURL.female.url, avatarURL.female.obj, avatarURL.female.mtl).then((model) => {
        avatarControllerObj.avatar = avatarURL.female.type;
        avatarControllerObj.add(model);
        avatarControllerObj.setModelSize(model);
        createScene(avatarControllerObj, avatarView, {x: 0, y: 0, z: 8.5});

        // avatarView.children[2].style.marginLeft = avatarView.offsetWidth/10 + "px";
        avatarReady = true;
    });
};