const PLAYER_TWO_WIN = 'PLAYER TWO WIN';

var answer; // no longer has to be defined, now that chosen word is sent from player one

var hasTimeToGuess = false;
var correctGuess = false;

const isCorrectGuess = () => {
    // validation
    const userGuess = String(document.getElementById("guess-entry").value);
    console.log(userGuess);

    if (answer == undefined) {

        alert("player one hasn't chosen a word to draw yet");
        return;

    } else if (hasTimeToGuess == false) {

        alert("You've run out of time to guess :(");
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
        // lives -= 1; this is not defined

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

var timerWorker;

const startTimer = () => {
    hasTimeToGuess = true;

    if (typeof(Worker) !== "undefined" ) {
        if (typeof(timerWorker) == "undefined") {

            // webworkers --> a way of multithreading in js
            timerWorker = new Worker("timer.js");

        }

        timerWorker.onmessage = (event) => {
            if (correctGuess == true) {

                document.getElementById('timer').innerHTML = "Time left to guess: " + event.data;

                // remove user input once they guess correctly
                document.getElementById("guess-entry").style.display = "none";
                document.getElementById("submit-guess").style.display = "none";

                stopWorker();

            } else if (event.data == 0 && correctGuess == false ) {

                document.getElementById('timer').innerHTML = "Time left to guess: " + event.data;

                document.getElementById("input-result").innerHTML = "You've run out of time!"

                // remove user input once they run out of time
                document.getElementById("guess-entry").style.display = "none";
                document.getElementById("submit-guess").style.display = "none";

                stopWorker();

            } else {

                document.getElementById('timer').innerHTML = "Time left to guess: " + event.data;

            }
        };
    }
}

const stopWorker = () => {

    hasTimeToGuess = false;
    timerWorker.terminate(); // terminates instance of web worker
    timerWorker = undefined;

}


//  web socket connections

// for sending guesses to the server
const url = "wss://i788c.sse.codesandbox.io/";
const guessConnection = new WebSocket(url + "guess"); // create a new websocket connection to port 8080 --> send to endpoint "guess"
const INCOMING_GUESS = "INCOMING GUESS: "; // put this at the beginning of the message

guessConnection.onopen = () => { // when the connection to port 8080 is made
    console.log("player two connected"); // testing message
    guessConnection.send(document.getElementById('guess-entry').value);
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
}




