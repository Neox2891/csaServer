const express = require('express');
const User = require('../models/users');
const bcrypt = require('bcrypt');
var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;
const app = express();

app.use(passport.initialize());
app.use(passport.session());

let auth = (req, res, next) => {

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
    
//    passport.authenticate('local');

}


module.exports = {
    app,
    auth
}