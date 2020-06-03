// canvas
window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = 400;
    canvas.width = 500;
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
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.lineTo(e.clientX, e.clientY);
        if (brush) {
            ctx.strokeStyle = "black"
        } else {
            ctx.strokeStyle = "white"
        }
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY)
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
  })
