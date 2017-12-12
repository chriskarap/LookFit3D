class Person extends THREE.Object3D {
    constructor() {
        super();
        scene.add(this);
        this.position.y = 0.9;

        this.mouseDown = false;
        this.border = false;

        window.addEventListener('mousedown', (event) => {
            this.mouseDown = true;
        });
        window.addEventListener('mouseup', (event) => {
            this.mouseDown = false;
        });
        window.addEventListener('mousemove', (event) => {
            if (this.mouseDown) {
                this.rotation.y += 0.01 * event.movementX;
                const nextX = this.rotation.x + 0.005 * event.movementY;
                if (!this.border && nextX < Math.PI / 6 && nextX > -Math.PI / 6) {
                    this.rotation.x = nextX;
                }
            }
        });
    }

}