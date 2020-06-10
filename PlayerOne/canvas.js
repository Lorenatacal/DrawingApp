// canvas
const Y_AXIS_COMPENSATION = - 290
const X_AXIS_COMPENSATION = - 770

window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    // canvas.height = window.innerHeight - 500;
    // canvas.width = window.innerWidth - 500;

    // canvas.addEventListener("resize", () => {

    // })

    let brush = true;
    let drawing = false;
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
        ctx.lineWidth = 3.5;
        ctx.lineCap = "round";
        //  x and y compensation constants are added to make brush placement more accurate
        ctx.lineTo(e.clientX + X_AXIS_COMPENSATION, e.clientY + Y_AXIS_COMPENSATION);
        drawingConnection.send(e.clientX + X_AXIS_COMPENSATION, e.clientY + Y_AXIS_COMPENSATION)
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
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);
    erase.addEventListener("click", switchToErase);
    pen.addEventListener("click", switchToBrush);
    restart.addEventListener("click", clearAll);
<<<<<<< HEAD
 })
=======
  })

    // url = "wss://dug7q.sse.codesandbox.io/";

  //send drawing to player two
  console.log(url, 'url')
  const drawingConnection = new WebSocket(url + "draw");
  const INCOMING_DRAWING = "INCOMING DRAWING: ";

  drawingConnection.onopen = () => {
      console.log("Player's one drawing");
      drawingConnection.send('player two is ready to receive drawing')
  }

  drawingConnection.onerror = err => {
      console.log(`Websocket error ${err}`)
  }
>>>>>>> de612d4... Add websockets to send the coordinates to player 2
