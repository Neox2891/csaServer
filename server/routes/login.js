const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const app = express();

app.post('/login', (req, res) => {

  let body = req.body;

  User.findOne({ email: body.email }, (err, usuarioDB) => {
    if (err) {

        return res.status(500).json({
            ok: false,
            err
        });
    }

    if (!usuarioDB) {

        return res.status(400).json({
            ok: false,
            err: {
                message: '(Usuario) o contraseña incorrectos'
            }
        });
    }

    if (!bcrypt.compareSync(body.passwd, usuarioDB.password)) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Usuario o (contraseña) incorrectos'
            }
        });
    }

    let token = jwt.sign({
        usuario: usuarioDB
    }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

    res.json({
        ok: true,
        user: usuarioDB,
        token
    });
  });
});

   


module.exports = app;