// canvas
const Y_AXIS_COMPENSATION = - 85
const X_AXIS_COMPENSATION = - 4


window.onload = () => {

    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = 400;
    canvas.width = 500;
    let brush = true;
    let drawing = false;


}


function startPosition(e) {
    drawing = true;
    draw(e);
}
function endPosition() {
    drawing = false;
    ctx.beginPath();
}
function draw(e) {
    if (!drawing) return;
    if (brush) { // moved this up so that this could possibly also change stroke size when using the eraser?
        ctx.strokeStyle = "black"
    } else {
        ctx.strokeStyle = "white"
    }
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    //  x and y compensation constants are added to make brush placement more accurate
    ctx.lineTo(e.clientX + X_AXIS_COMPENSATION, e.clientY + Y_AXIS_COMPENSATION);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX + X_AXIS_COMPENSATION, e.clientY +  Y_AXIS_COMPENSATION);
}
function switchToErase() {
    brush = false;
}
function switchToBrush() {
    brush = true;
}
function clearAll() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
}


// create a socket to listen to the coordinates sent by player one
const drawConnection = new WebSocket(url + "draw");

drawConnection.onopen(() => {
    drawConnection.send("I'm awake and waiting for a drawing");
});

drawingConnection.onerror((err) => {
    console.log(err);
});

drawingConnection.onmessage(() => {

})