class ControllerObj extends THREE.Object3D {
    constructor(view) {
        super();
        this.view = view;
        this.centerY = 0;
        this.modelHeight = 0;
        this.modelWidth = 0;

        this.mouseDown = false;
        this.border = false;

        this.view.addEventListener('mousedown', (event) => {
            this.mouseDown = true;
        });
        this.view.addEventListener('mouseup', (event) => {
            this.mouseDown = false;
        });
        this.view.addEventListener('mousemove', (event) => {
            if (this.mouseDown) {
                this.rotation.y += 0.01 * event.movementX;
                const nextX = this.rotation.x + 0.005 * event.movementY;
                if (!this.border && nextX < Math.PI / 6 && nextX > -Math.PI / 6) {
                    this.rotation.x = nextX;
                }
            }
        });

        this._trousers = null;
        this._shorts = null;
        this._dress = null;
        this._jacket = null;
    }

    get controllerObjY() {
        return this.centerY;
    }

    set trousers(obj){
        this._trousers = obj;
    }

    get trousers(){
        return this._trousers;
    }
    set shorts(obj){
        this._shorts = obj;
    }

    get shorts(){
        return this._shorts;
    }
    set dress(obj){
        this._dress = obj;
    }

    get dress(){
        return this._dress;
    }
    set jacket(obj){
        this._jacket = obj;
    }

    get jacket(){
        return this._jacket;
    }

    setModelSize(model) {
        model.children.forEach((child) => {
            child.geometry.computeBoundingBox();
            // todo: compute center for children
            this.centerY = (Math.abs(child.geometry.boundingBox.min.y) + Math.abs(child.geometry.boundingBox.max.y)) / 2;
            this.modelHeight = Math.abs(child.geometry.boundingBox.min.y - child.geometry.boundingBox.max.y);
            this.modelWidth = Math.abs(child.geometry.boundingBox.min.x - child.geometry.boundingBox.max.x);
        });

        model.position.y -= this.centerY;

        (this.modelWidth > this.modelHeight) ?
            this.proportion = this.view.offsetHeight / this.modelWidth : this.proportion = this.view.offsetHeight / this.modelHeight;

        this.scale.set(this.proportion / 100, this.proportion / 100, this.proportion / 100);
    }

}