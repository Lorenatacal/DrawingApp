$(document).ready(function() {
  var wordsArray = ["dog", "wolf", "lemon", "strawberry", "tower", "lovers", "apple", "worm", "jellyfish", "magic wand", "cat", "bookshelf", "violin"];
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

      $.ajax(settings)
      .done(function (response) {
        console.log('completed GET request for random words successfully');
        wordsArray.push(response.words);
        randomWord = wordsArray[0][Math.floor(Math.random() * wordsArray.length)];
        $("#randomWord").text(randomWord);
      })
      .fail(function (response) { // if we get a failed reponse, we will just switch to using the local array
        console.log('failed random word request: ');
        randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
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
      randomWord = wordsArray[Math.floor(Math.random() * 6)];
      $("#randomWord").text(randomWord);
  });

  $('#choose-word').on("click", function(event) { // send the chosen word to player two's page for validation
    console.log('choosing this word');
    chosenWord = $("#randomWord").text();
    chosenWordConnection.send(INCOMING_SUBMITTED_WORD + chosenWord);

    //once they choose the word, they shouldn't be able to choose a new word, or get a new word
    document.getElementById("choose-word").style.display = "none";
    document.getElementById("get-new-word").style.display = "none";
  })
})

//  web socket connection
// route address
const url = "wss://i788c.sse.codesandbox.io/";

// connection to send chosen word to others
const chosenWordConnection = new WebSocket(url + "chosen-word"); // create a new websocket connection to port 8080 - connect to specific endpoint 'submit-word'
const INCOMING_SUBMITTED_WORD = "INCOMING SUBMITTED WORD: "; // put this at the beginning of the message

chosenWordConnection.onopen = () => { // when the connection to port 8080 is made
  chosenWordConnection.send("hello from player one's word submission connection");
}

chosenWordConnection.onerror = err => { // if the connection has an error
  console.log(`Websocket error ${err}`)
}

// connection to recieve winner
const winnerConnection =  new WebSocket(url + "winner");
const PLAYER_TWO_WIN = "PLAYER TWO WIN ";
const PLAYER_ONE_WIN = "PLAYER ONE WIN";

winnerConnection.onmessage = (e) => {
  if (e.data == PLAYER_ONE_WIN) {
    document.getElementById('winner').innerHTML = "You Win!";
  } else if (e.data == PLAYER_TWO_WIN) {
    document.getElementById('winner').innerHTML = "You Lose!";
  }
}



