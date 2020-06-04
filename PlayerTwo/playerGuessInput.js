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
    } else {
        document.getElementById("input-result").innerHTML = "incorrect";
        lives -= 1;

        displayLivesRemaining();

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
    connection.send(`${FROM_CLIENT}${guess}`)
}


const displayLivesRemaining = () => {
    document.getElementById('lives').innerHTML = "lives: " + lives;
}


//  web socket connection
const url = "ws://localhost:8080";
const connection = new WebSocket(url); // create a new websocket connection to port 8080
const FROM_CLIENT = "FROM CLIENT: "; // put this at the beginning of the message

connection.onopen = () => { // when the connection to port 8080 is made
    console.log("connected"); // testing message
    connection.send("hello");
}

connection.onerror = err => { // if the connection has an error
    console.log(`Websocket error ${err}`)
}

connection.onmessage = e => { // if this connection recieves a message from the server
    displayPreviousGuesses(e.data); // display the guess recieved from the server
}



