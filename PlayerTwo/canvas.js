// canvas
const Y_AXIS_COMPENSATION = - 85
const X_AXIS_COMPENSATION = - 4


var canvas;
var ctx;
var brush;
var drawing;


window.onload = () => {
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    canvas.height = 400;
    canvas.width = 500;
    brush = true;
    drawing = false;
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
        ctx.strokeStyle = "black";
    } else {
        ctx.strokeStyle = "white";
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
const INCOMING_DRAWING = "INCOMING DRAWING: ";


drawConnection.onopen = () => {
    drawConnection.send("I'm awake and waiting for a drawing");
};

drawConnection.onerror = (err) => {
    console.log(err);
};

drawConnection.onmessage = (e) => {
    if(e.data.startsWith(INCOMING_DRAWING)) {
        console.log(e.data);
        // some way to parse the message as a js object
        let drawingCoords = JSON.parse(e.data.replace(INCOMING_DRAWING, ""));
        console.log(drawingCoords);

        startPosition(e.data.replace(INCOMING_DRAWING, ""));
    }
};