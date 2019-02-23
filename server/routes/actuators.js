const express = require('express');
const Actuators = require('../models/actuators');
const { rezoned } = require('../config/config');
const { verificarToken } = require('../middlewares/autentication');
const app = express();

app.get('/actuators', (req, res) => {

    Actuators.find((err, actuatorsDb) => {

        if (err) {
            return res.json({
                ok:false,
                err
            });
        }
        
        const latestActuators = actuatorsDb[actuatorsDb.length - 1];
        
        res.json({
            ok: true,
            latestActuators
        });

    });

});

app.post('/actuators', (req, res) => {

    let body = req.body;
    let date = rezoned().date.join('T');

    let actuators = new Actuators();

    actuators.actuators = body.actuators;
    actuators.date = date;
    actuators.switch = body.switch;
    actuators.flag = body.flag;


    actuators.save((err, actuatorsDb) => {
        
        (err) ? res.status(500).json({
            ok:false,
            err
        }) : res.status(201).json({
            ok: true,
            actuatorsDb
        });

    });

});

module.exports = app;