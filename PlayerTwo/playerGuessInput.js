const answer = "Cat";
var lives = 5;


const isCorrectGuess = () => {


    // validation
    const userGuess = String(document.getElementById("guess-entry").value);
    console.log(userGuess);

    if(lives == 0) {

        alert("You've run out of lives :(");
        return;

    }

    if (!userGuess) {

        document.getElementById("input-result").innerHTML = "Make sure you input a guess before pressing submit";

    } else if((userGuess.toLowerCase()).includes(answer.toLowerCase())) {

        document.getElementById("input-result").innerHTML = "correct!";

        sendGuess(userGuess);

        displayPreviousGuesses(userGuess);

    } else {
        document.getElementById("input-result").innerHTML = "incorrect";
        lives -= 1;

        displayLivesRemaining();

        sendGuess(userGuess);

        displayPreviousGuesses(userGuess);
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
    connection.send(`${FROM_CLIENT}${guess}`)
}


const displayLivesRemaining = () => {
    document.getElementById('lives').innerHTML = "lives: " + lives;
}


//  web socket connection
const url = "ws://localhost:3000";
const connection = new WebSocket(url);
const FROM_CLIENT = "FROM CLIENT: ";
const FROM_SERVER = "TO CLIENT: ";

connection.onopen = () => {
    console.log("connected");
    connection.send("hello");
}

connection.onerror = err => {
    console.log(`Websocket error ${err}`)
}

connection.onmessage = e => {
    displayPreviousGuesses(e.data);
}



