$(document).ready(function() {
  var wordsArray = [];
  var randomWord = ''

  function getRandomWord() {
    try {
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://random-words2.p.rapidapi.com/words?limit=32&lang=en&typesOf=noun",
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "random-words2.p.rapidapi.com",
          "x-rapidapi-key": "5b5400d749msh5736bd5c72a6b47p1b28a3jsn7139ce7a6909"
        }
      }

      $.ajax(settings).done(function (response) {
        console.log(response, 'respinse')
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

