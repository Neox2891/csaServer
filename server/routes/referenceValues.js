const express = require('express');
const ReferenceValues = require('../models/referenceValues');
const app = express();

app.get('/referenceValues', (req, res) => {

    ReferenceValues.find((err, referenceValuesDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        let latestReferenceValues = referenceValuesDB[referenceValuesDB.length - 1];

        res.status(200).json({
            ok: true,
            latestReferenceValues
        });

    });

});

app.post('/referenceValues', (req, res) => {

    let maxTemp = req.body.maxTemp, 
    minTemp = req.body.minTemp,
    maxHum = req.body.maxHum,
    minHum = req.body.minHum,
    maxAir = req.body.maxAir,
    flag = req.body.flag;

    // let usuarioId = req.usuario._id;

    let referenceValues = new ReferenceValues({
        maxTemp,
        minTemp,
        maxHum,
        minHum,
        maxAir,
        flag
    });

    referenceValues.save((err, referenceValuesDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            referenceValuesDB
        });

    });
});

module.exports = app;