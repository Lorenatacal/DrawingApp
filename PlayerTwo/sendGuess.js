// web socket connection

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

if (connection.readyState == OPEN) {
    connection.onmessage = e => {
        displayPreviousGuesses(e.data);
    }
} else {
    console.log("ws connection is not open")
}