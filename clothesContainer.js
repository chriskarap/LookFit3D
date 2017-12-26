const clothesContainer = () => {
    const header = document.getElementById('header');
    const contextHeight = (window.innerHeight - header.offsetHeight);

    const clothesView = document.getElementById('clothes-body');
    clothesView.style.height = contextHeight  + 'px';
    const templateClothes = document.getElementById('template-3d-clothes').text;
    const elemClassName = 'cloth';

    for (let i = 0; i < clothes_list.length; i++) {
        const element = document.createElement("div");
        element.classList += ' row';
        element.classList += ' disableSelection';
        element.setAttribute('data-index', elemClassName + (i));

        element.style.height = contextHeight / 6  + 'px';

        element.innerHTML = templateClothes;
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
};