/// canvas
const Y_AXIS_COMPENSATION = - 460
const X_AXIS_COMPENSATION = - 670

window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = 500;
    canvas.width = 600;

    // canvas.addEventListener("resize", () => {

    // })

    let brush = true;
    let drawing = false;
    let shouldClearCanvas = false;

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
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";

        // get position of the mouse on the canvas
        var pos = getMousePos(e);

        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    }

    function switchToErase() {
        brush = false;
    }

    function switchToBrush() {
        brush = true;
    }

    function clearAll() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        shouldClearCanvas = false;
    }

    function getMousePos(e) {
        // rect is the area that an element occupies relative to the size of the view port
        // we can get the exact coordinates of the mouse relative to the canvas itself by subtracting the canvas's area from the outer viewport area
        // because we are always checking the canvas position relative to the rest of the viewport, it is much more accurate than using constant values
        // to compensate for the offset
        // this element method also takes into account the amount of scroll in a webpage!

        var rect = canvas.getBoundingClientRect();
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
    }

    canvas.addEventListener("mousedown", (e) => {
        // drawingConnection.send(`${INCOMING_DRAWING}{
        //     "coordX" : "${e.clientX + X_AXIS_COMPENSATION}",
        //     "coordY" : "${e.clientY + Y_AXIS_COMPENSATION}",
        //     "isDrawing" : "${drawing}",
        //     "isUsingBrush" : "${brush}",
        //     "clearCanvas" : ${shouldClearCanvas},
        //     "actionType" : "mousedown"
        // }`);

        startPosition(e);
    });

    canvas.addEventListener("mouseup", (e) => {
        // drawingConnection.send(`${INCOMING_DRAWING}{
        //     "coordX" : "${e.clientX + X_AXIS_COMPENSATION}",
        //     "coordY" : "${e.clientY + Y_AXIS_COMPENSATION}",
        //     "isDrawing" : "${drawing}",
        //     "isUsingBrush" : "${brush}",
        //     "clearCanvas" : "${shouldClearCanvas}",
        //     "actionType" : "mouseup"
        // }`);

        endPosition()
    });

    canvas.addEventListener("mousemove", (e) => {
        // drawingConnection.send(`${INCOMING_DRAWING}{
        //     "coordX" : "${e.clientX + X_AXIS_COMPENSATION}",
        //     "coordY" : "${e.clientY + Y_AXIS_COMPENSATION}",
        //     "isDrawing" : "${drawing}",
        //     "isUsingBrush" : "${brush}",
        //     "clearCanvas" : "${shouldClearCanvas}",
        //     "actionType" : "mousemove"
        // }`);

        draw(e);
    });

    erase.addEventListener("click", switchToErase);

    pen.addEventListener("click", switchToBrush);
    restart.addEventListener("click", () => {
        shouldClearCanvas = true;
        clearAll();
    });

  })

    // url = "wss://dug7q.sse.codesandbox.io/";

  //send drawing to player two
//   console.log(url, 'url')
//   const drawingConnection = new WebSocket(url + "draw");
//   const INCOMING_DRAWING = "INCOMING DRAWING: ";

//   drawingConnection.onopen = () => {
//       console.log("Player's one drawing");
//       drawingConnection.send('player one is ready to send drawing')
//   }

//   drawingConnection.onerror = err => {
//       console.log(`Websocket error ${err}`)
//   }



// create a socket to listen to the coordinates sent by player one
// const drawConnection = new WebSocket(url + "draw");
// const INCOMING_DRAWING = "INCOMING DRAWING: ";


// drawConnection.onopen = () => {
//     drawConnection.send("I'm awake and waiting for a drawing");
// };

// drawConnection.onerror = (err) => {
//     console.log(err);
// };

// drawConnection.onmessage = (e) => {
//     if(e.data.startsWith(INCOMING_DRAWING)) {

//         let drawingAction = JSON.parse(e.data.replace(INCOMING_DRAWING, ""));
//         // console.log(drawingAction);

//         // then we need to be able to handle starting, continuing, stopping drawing, changing brush and resetting the page
//         // this switch statenment is used to copy the event listeners we use in player one
//         switch(drawingAction.actionType){
//             case "mousedown":
//                 console.log('start drawing');
//                 startPosition(drawingAction);
//                 break;
//             case "mousemove":
//                 console.log('mouse move');
//                 draw(drawingAction);
//                 break;
//             case "mouseup":
//                 console.log("finish drawing");
//                 endPosition(drawingAction);
//             default:
//                 console.log(drawingAction);
//                 break;
//         }
//         // startPosition(e.data.replace(INCOMING_DRAWING, ""));
//     }
// };