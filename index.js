$(document).ready(function() {
  var wordsArray = [];
  var randomWord = ''

  function getRandomWord() {
    try {
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://random-words2.p.rapidapi.com/words?limit=32&lang=en&yypesOf=noun",
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "random-words2.p.rapidapi.com",
          "x-rapidapi-key": "5b5400d749msh5736bd5c72a6b47p1b28a3jsn7139ce7a6909"
        }
      }
      
      $.ajax(settings).done(function (response) {
        wordsArray.push(response.words);
        randomWord = wordsArray[0][Math.floor(Math.random() * wordsArray.length)];
        $("#randomWord").text(randomWord);
      });
    }
    catch(err) {
        alert("err");
    }
  }

  getRandomWord();

  $(".get-Word").on("click", function(event) {
    event.preventDefault();
      randomWord = wordsArray[0][Math.floor(Math.random() * 31)];
      $("#randomWord").text(randomWord);
  });
})

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
