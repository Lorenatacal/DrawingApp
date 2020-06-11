/// canvas
const Y_AXIS_COMPENSATION = - 460
const X_AXIS_COMPENSATION = - 670

window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = 500;
    canvas.width = 600;

    let brush = true;
    let drawing = false;
    let shouldClearCanvas = false;


    function startPosition() {
        drawing = true;
    }
    function endPosition() {
        drawing = false;
        ctx.beginPath();
    }
    function draw(x, y) {
        if (!drawing) return;

        if (brush) { // moved this up so that this could possibly also change stroke size when using the eraser?
            ctx.strokeStyle = "black"
        } else {
            ctx.strokeStyle = "white"
        }
        ctx.lineWidth = 5;
        ctx.lineCap = "round";

        // get position of the mouse on the canvas

        ctx.beginPath();
        ctx.lineTo(x,y);
        ctx.stroke();
        ctx.moveTo(x, y);
    }

    function clearAll() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        shouldClearCanvas = false;
    }

    // create a socket to listen to the coordinates sent by player one

    // if this ones are created outside of the eventListener startPosition(drawingAction), draw(drawingAction) and endPosition(drawingAction); are undifined
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

            let drawingAction = JSON.parse(e.data.replace(INCOMING_DRAWING, ""));
            let { coordX, coordY } = drawingAction;
            // then we need to be able to handle starting, continuing, stopping drawing, changing brush and resetting the page
            // this switch statenment is used to copy the event listeners we use in player one
            switch(drawingAction.actionType){
                case "mousedown":
                    console.log('start drawing');
                    startPosition();
                    break;
                case "mousemove":
                    console.log('mouse move');
                    draw(coordX, coordY);
                    break;
                case "mouseup":
                    console.log("finish drawing");
                    endPosition();
                default:
                    console.log(drawingAction);
                    break;
            }
            // startPosition(e.data.replace(INCOMING_DRAWING, ""));
        }
    };
})