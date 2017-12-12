const loadObj = (path, objPath, mtlPath) => {
    return new Promise((resolve, reject) => {
        let res = null;
        let mtl = null;

        const ModelLoader = new THREE.OBJLoader();
        const MTLLoader = new THREE.MTLLoader();

        ModelLoader.setPath(path);
        MTLLoader.setPath(path);

        MTLLoader.load(mtlPath, (material) => {
            material.preload();
            mtl = material;
            ModelLoader.setMaterials(mtl);
            ModelLoader.load(objPath, (obj) => {
                res = obj;
                resolve(res);
            });
        });
    });
};