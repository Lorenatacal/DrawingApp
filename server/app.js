const express = require("express");
const app = express();
require("express-ws")(app);

// using the library ws
const WebSocket =  require("ws");

// create new eb socket connection on port 8080
const wss = new WebSocket.Server({ port: 8080});

const FROM_CLIENT = "FROM CLIENT: ";
const FROM_SERVER = "TO CLIENT: ";


wss.on("connection", function connection(ws) {
    ws.on("message", function incomingGuess(guess) {
        wss.clients.forEach((client) => {
            if (client.readyState == WebSocket.OPEN) {
                if (guess.startsWith(FROM_CLIENT)) {
                    const guessAccepted = guess.replace(FROM_CLIENT, "");
                    client.send(guessAccepted);
                }
            }
        })

    })
})

app.ws("/", function(ws, req) {
  ws.on("message", function(msg) {
    console.log(msg);
  });
  console.log("socket", req.testing);
});

app.listen(3000);



