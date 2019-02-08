require('./config/config');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const http = require('http');
const cors = require('cors');
const app = express();

let server = http.createServer(app);

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(require('./routes/index'));

// app.get('/', (req, res) => {
//     console.log('Inside the homepage callback function')
//     console.log(req.sessionID)
//     res.send(`You hit home page!\n`)
// });

module.exports.io = socketIO(server);
require('./sockets/socket');

mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err) => {
    
    if (err) {
        throw err;
    }

    console.log('Conectado con base de datos!');
});

server.listen(process.env.PORT, (err) => {

    if (err) {
        throw err;
    }

    console.log(`Escuchando en el puerto ${process.env.PORT}`);
});