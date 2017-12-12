let mouseDown = false;

window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mouseup', onMouseUp);
window.addEventListener('mousemove', onMouseMove);

function onMouseMove(event) {
    if(mouseDown){
        const x = event.clientX;
        const y = event.clientY;
        console.log("X coords: " + x + ", Y coords: " + y);
    }
}
function onMouseDown (event) {
    mouseDown = true;
}
function onMouseUp (event) {
    mouseDown = false;
}
