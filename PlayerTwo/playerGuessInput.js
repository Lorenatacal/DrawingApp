var answer = "Cat";
var timer;
var timerDuration = 10; // player currently has ten seconds to guess :)
var correctGuess = false;

const isCorrectGuess = () => {
    // validation
    const userGuess = String(document.getElementById("guess-entry").value);
    console.log(userGuess);

    if(timerDuration == 0) {
        alert("You've run out of time :(");
        return;
    }

    if (!userGuess) {

        document.getElementById("input-result").innerHTML = "Make sure you input a guess before pressing submit";

    } else if((userGuess.toLowerCase()).includes(answer.toLowerCase())) {

        document.getElementById("input-result").innerHTML = "correct!";

        correctGuess = true;

        displayPreviousGuesses(userGuess)

        sendGuess(userGuess);

    } else {
        document.getElementById("input-result").innerHTML = "incorrect";
        lives -= 1;

        displayPreviousGuesses(userGuess);

        // THIS SENDS THE GUESS TO THE SERVER
        sendGuess(userGuess);

    }
}

const displayPreviousGuesses = (lastGuess) => {
    if(!lastGuess) {
        return;
    } else {
        var newGuessItem = document.createElement("li");
        newGuessItem.appendChild(document.createTextNode(lastGuess));

        document.getElementById("previous-guesses").appendChild(newGuessItem);
    }
}


const sendGuess = (guess) => {
    guessConnection.send(`${INCOMING_GUESS}${guess}`)
}


// const minusLivesRemaining = () => {
//     document.getElementById('lives').innerHTML = "lives: " + lives;
// }


const startTimer = () => {
    timer = setInterval(() => {

        document.getElementById('timer').innerHTML = "Time left to guess: " + timerDuration;

        if (timerDuration == 0) {
            stopTimer();

            // remove user input once they run out of time
            document.getElementById("guess-entry").style.display = "none";
            document.getElementById("submit-guess").style.display = "none";

            document.getElementById("input-result").innerHTML = "You've run out of time!"

        } else if (correctGuess == true) {

            stopTimer();

            // remove user input once they guess correctly
            document.getElementById("guess-entry").style.display = "none";
            document.getElementById("submit-guess").style.display = "none";
        } else {
            timerDuration -= 1;
        }

    }, 1000)
}

const stopTimer = () => {
    clearInterval(timer);
}


//  web socket connections

// for sending guesses to the server
const url = "wss://i788c.sse.codesandbox.io/";
const guessConnection = new WebSocket(url + "guess"); // create a new websocket connection to port 8080 --> send to endpoint "guess"
const INCOMING_GUESS = "INCOMING GUESS: "; // put this at the beginning of the message

guessConnection.onopen = () => { // when the connection to port 8080 is made
    console.log("player two connected"); // testing message
    guessConnection.send("hello");
}

guessConnection.onerror = err => { // if the connection has an error
    console.log(`Websocket error ${err}`)
}


// collect the chosen word from player one
const chosenWordConnection = new WebSocket(url + "chosen-word");

chosenWordConnection.onopen = () => {
    chosenWordConnection.send("player two is ready to receive the chosen word");
}

chosenWordConnection.onmessage = (e) => {
    answer = e.data;
    console.log('answer is now: ' + answer);
    startTimer();
    console.log('Start guessing now!')
}




