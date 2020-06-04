const express = require("express"); 
const path = require('path');
const app = express();
require("express-ws")(app);
const port = 3000

app.use(express.static('public'))

// res.sendFile(path.join(__dirname, '../public', 'index1.html'));
app.get('/', (req, res) => res.send('Hello Word'))

app.get('/player-one', (req, res) => res.sendFile('indexPlayerOne.html', { root: path.join(__dirname, 'public')}))

app.get('/player-two', (req, res) => res.sendFile('indexPlayerTwo.html', { root: path.join(__dirname, 'public')}))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

// create an app that is available on a port => create server


//express how we render an html page => render your html pages