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
};
