const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const ReferenceValuesSchema = new Schema({
    maxTemp: {
        type: Number,
        default: 100,
        required: [true, 'Temperatura maxima es requerida']
    },
    minTemp: {
        type: Number,
        default: 100,
        required: [true, 'Temperatura minima es requerida']
    },
    maxHum: {
        type: Number,
        default: 100,
        required: [true, 'Humedad maxima es requerida']
    },
    minHum: {
        type: Number,
        default: 100,
        required: [true, 'Humedad minima es requerida']
    },
    maxAir: {
        type: Number,
        default: 100,
        required: [true, 'Calidad de aire es requerida']
    },
    date: {
        type: String
    },
    flag: {
        type: Boolean,
        default: false 
    }
});

module.exports = mongoose.model('ReferenceValues', ReferenceValuesSchema);