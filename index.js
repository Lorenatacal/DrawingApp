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
          "x-rapidapi-key": "029d021b2amsh497d8f4d0f8a4d9p126da8jsn32e7b97413ba"
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
});
