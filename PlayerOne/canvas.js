// canvas
const Y_AXIS_COMPENSATION = - 460
const X_AXIS_COMPENSATION = - 670

window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    // canvas.height = window.innerHeight - 500;
    // canvas.width = window.innerWidth - 500;

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
        shouldClearCanvas = false;
    }
    canvas.addEventListener("mousedown", (e) => {
        drawingConnection.send(`${INCOMING_DRAWING}{
            "coordX" : "${e.clientX + X_AXIS_COMPENSATION}",
            "coordY" : "${e.clientY + Y_AXIS_COMPENSATION}",
            "isDrawing" : "${drawing}",
            "isUsingBrush" : "${brush}",
            "clearCanvas" : ${shouldClearCanvas},
            "actionType" : "mousedown"
        }`);

        startPosition(e);
    });

    canvas.addEventListener("mouseup", (e) => {
        drawingConnection.send(`${INCOMING_DRAWING}{
            "coordX" : "${e.clientX + X_AXIS_COMPENSATION}",
            "coordY" : "${e.clientY + Y_AXIS_COMPENSATION}",
            "isDrawing" : "${drawing}",
            "isUsingBrush" : "${brush}",
            "clearCanvas" : "${shouldClearCanvas}",
            "actionType" : "mouseup"
        }`);

        endPosition()
    });

    canvas.addEventListener("mousemove", (e) => {
        drawingConnection.send(`${INCOMING_DRAWING}{
            "coordX" : "${e.clientX + X_AXIS_COMPENSATION}",
            "coordY" : "${e.clientY + Y_AXIS_COMPENSATION}",
            "isDrawing" : "${drawing}",
            "isUsingBrush" : "${brush}",
            "clearCanvas" : "${shouldClearCanvas}",
            "actionType" : "mousemove"
        }`);

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
  console.log(url, 'url')
  const drawingConnection = new WebSocket(url + "draw");
  const INCOMING_DRAWING = "INCOMING DRAWING: ";

  drawingConnection.onopen = () => {
      console.log("Player's one drawing");
      drawingConnection.send('player one is ready to send drawing')
  }

  drawingConnection.onerror = err => {
      console.log(`Websocket error ${err}`)
  }
