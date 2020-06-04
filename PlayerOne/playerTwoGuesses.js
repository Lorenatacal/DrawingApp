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
const url = "wss://i788c.sse.codesandbox.io/";
const connection = new WebSocket(url); // create a new websocket connection to port 8080
const INCOMING_GUESS = "INCOMING GUESS: "; // put this at the beginning of the message

connection.onopen = () => { // when the connection to port 8080 is made
    console.log("player one connected"); // testing message
    connection.send("hello from player one");
}

connection.onerror = err => { // if the connection has an error
    console.log(`Websocket error ${err}`)
}

connection.onmessage = e => { // if this connection recieves a message from the server
    console.log(e.data)
    displayPreviousGuesses(String(e.data).replace(INCOMING_GUESS, ""))
}