const displayPreviousGuesses = (lastGuess) => {
    if(!lastGuess) {
        return;
    } else {
        var newGuessItem = document.createElement("li");
        newGuessItem.appendChild(document.createTextNode(lastGuess));

        document.getElementById("previous-guesses").appendChild(newGuessItem);
    }
}

//  web socket connection
// url = "wss://i788c.sse.codesandbox.io/";
const guessConnection = new WebSocket(url + "guess"); // create a new websocket connection to port 8080
INCOMING_GUESS = "INCOMING GUESS: "; // put this at the beginning of the message

guessConnection.onopen = () => { // when the connection to port 8080 is made
    console.log("player one connected"); // testing message
    chosenWordConnection.send("hello from player one");
}

guessConnection.onerror = err => { // if the connection has an error
    console.log(`Websocket error ${err}`)
}

guessConnection.onmessage = e => { // if this connection recieves a message from the server
    console.log(e.data)
    displayPreviousGuesses(String(e.data).replace(INCOMING_GUESS, ""))
}