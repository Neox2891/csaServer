const express = require('express');
const Users = require('../models/users');
const bcrypt = require('bcrypt');
const date = require('../config/config');
const keygen = require("keygenerator");
const app = express();


app.post('/users', (req, res) => {

    let body =  req.body;

    let newUser = new Users({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        keyDevice: keygen._({
            specials: true
        }),
        date: date.rezoned().date.join('T')
    });

    newUser.save((err, user) => {
        
        if (err) {
           return res.status(501).json({
                ok: false,
                err 
            });    
        }

        res.status(201).json({
            ok: true,
            user
        });
    });

});

module.exports = app;