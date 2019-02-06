require('./config/config');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const http = require('http');
const passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;
const User = require('./models/users');
const cors = require('cors');
var session = require('express-session');
const FileStore = require('session-file-store')(session);
const uuid = require('uuid/v4');
const app = express();

let server = http.createServer(app);

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// add & configure middleware
app.use(session({
    genid: (req) => {
        console.log('Inside the session middleware')
        console.log(req.sessionID)
        return uuid(); // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: 'keyboard dog',
    resave: false,
    saveUninitialized: true
}));

//app.use(express.static(path.resolve(__dirname, '../public')));

app.use(require('./routes/index'));

app.get('/', (req, res) => {
    console.log('Inside the homepage callback function')
    console.log(req.sessionID)
    res.send(`You hit home page!\n`)
});

module.exports.io = socketIO(server);
require('./sockets/socket');

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});
  
passport.deserializeUser(function(id, cb) {
    User.findById(id, function(err, user) {
        cb(err, user);
    });
});

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