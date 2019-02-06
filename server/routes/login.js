const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;
const app = express();

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'passwd'
},
function(username, password, done) {
  User.findOne({ email: username }, function (err, user) {
    
    if (err) { return done(err); }
    
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
  //   if (!user.validPassword(password)) {
  //     return done(null, false, { message: 'Incorrect password.' });
  //   }
    return done(null, user);
  });
}))


app.post('/login', passport.authenticate('local'),
      function(req, res) {
        res.json({
          ok: true,
          user: req.user,
          session: req.session,
          sessionID: req.sessionID
        });
    });

    // Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
    //     if (err) {

    //         return res.status(500).json({
    //             ok: false,
    //             err
    //         });
    //     }

    //     if (!usuarioDB) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: '(Usuario) o contraseña incorrectos'
    //             }
    //         });
    //     }

    //     if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: 'Usuario o (contraseña) incorrectos'
    //             }
    //         });
    //     }

    //     let token = jwt.sign({
    //         usuario: usuarioDB
    //     }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

    //     res.json({
    //         ok: true,
    //         usuario: usuarioDB,
    //         token
    //     });

    // });


module.exports = app;