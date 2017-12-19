const ClothesFitting = (item, parent) => {

    if (item.type === 'trousers') {
        changeItem('trousers', ['shorts', 'dress']);
    }

    if (item.type === 'shorts') {
        changeItem('shorts', ['trousers', 'dress']);
    }

    if (item.type === 'dress') {
        changeItem('dress', ['trousers', 'shorts']);
    }
    if (item.type === 'jacket') {
        changeItem('jacket')
    }

    function changeItem(itemType, rejectTypes = []) {
        if (parent[itemType]) {
            if (item === parent[itemType]) {

                for (let i = 0; i< parent.children.length; i++){
                    if(item.uuid === parent.children[i].uuid){
                        parent.remove(parent.children[i]);
                        // break
                    }
                }
                parent[itemType].uuid = null;
                parent[itemType] = null;
            } else {
                for (let i = 0; i< parent.children.length; i++){
                    if(parent[itemType].uuid === parent.children[i].uuid){
                        parent.remove(parent.children[i]);
                        // break
                    }
                }
                loadObj(item.url, item.obj, item.mtl).then((model) => {
                    model.position.y -= parent.controllerObjY;
                    parent.add(model);
                    parent[itemType] = item;
                    parent[itemType].uuid = model.uuid;
                });
            }
        }
        else {
            if (rejectTypes.length) {
                rejectTypes.forEach((reject) => {
                    if (parent[reject]) {
                        for (let i = 0; i< parent.children.length; i++){
                            if(parent[reject].uuid === parent.children[i].uuid){
                                parent.remove(parent.children[i]);
                            }
                        }
                        parent[reject].uuid = null;
                        parent[reject] = null;

                    }
                });
            }
            loadObj(item.url, item.obj, item.mtl).then((model) => {
                model.position.y -= parent.controllerObjY;
                parent.add(model);
                parent[itemType] = item;
                parent[itemType].uuid = model.uuid;
            });
        }
    }


    // if (item.type === 'trousers') {
    //     if (parent.trousers) {
    //         parent.remove(parent.children[parent.trousers.index]);
    //
    //         loadObj(item.url, item.obj, item.mtl).then((model) => {
    //             model.position.y -= parent.controllerObjY;
    //             parent.add(model);
    //             parent.trousers = item;
    //             parent.trousers.index = parent.children.length - 1;
    //         });
    //     }
    //     else {
    //         if (parent.shorts) {
    //             parent.remove(parent.children[parent.shorts.index]);
    //             parent.shorts = null;
    //         }
    //         if (parent.dress) {
    //             parent.remove(parent.children[parent.dress.index]);
    //             parent.dress = null;
    //         }
    //
    //         loadObj(item.url, item.obj, item.mtl).then((model) => {
    //             model.position.y -= parent.controllerObjY;
    //             parent.add(model);
    //             parent.trousers = item;
    //             parent.trousers.index = parent.children.length - 1;
    //         });
    //     }
    //
    // }
    //
    // if (item.type === 'shorts' && !parent.shorts) {
    //     if (parent.trousers) {
    //         parent.remove(parent.children[parent.trousers.index]);
    //         parent.trousers = null;
    //     }
    //     if (parent.dress) {
    //         parent.remove(parent.children[parent.dress.index]);
    //         parent.dress = null;
    //     }
    //
    //     loadObj(item.url, item.obj, item.mtl).then((model) => {
    //         model.position.y -= parent.controllerObjY;
    //         parent.add(model);
    //         parent.shorts = item;
    //         parent.shorts.index = parent.children.length - 1;
    //     });
    // }
    //
    // if (item.type === 'dress' && !parent.dress) {
    //     if (parent.trousers) {
    //         parent.remove(parent.children[parent.trousers.index]);
    //         parent.trousers = null;
    //     }
    //     if (parent.shorts) {
    //         parent.remove(parent.children[parent.shorts.index]);
    //         parent.shorts = null;
    //     }
    //
    //     loadObj(item.url, item.obj, item.mtl).then((model) => {
    //         model.position.y -= parent.controllerObjY;
    //         parent.add(model);
    //         parent.dress = item;
    //         parent.dress.index = parent.children.length - 1;
    //     });
    // }
    //
    // if (item.type === 'jacket' && !parent.jacket) {
    //     loadObj(item.url, item.obj, item.mtl).then((model) => {
    //         model.position.y -= parent.controllerObjY;
    //         parent.add(model);
    //         parent.jacket = item;
    //         parent.jacket.index = parent.children.length - 1;
    //     });
    // }
};
