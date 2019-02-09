const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const ReferenceValuesSchema = new Schema({
    maxTemp: {
        type: Number,
    },
    minTemp: {
        type: Number,
    },
    maxHum: {
        type: Number,
    },
    minHum: {
        type: Number,
    },
    maxAir: {
        type: Number,
    },
    actuators: [Number],
    flag: {
        type: Boolean,
        default: false 
    }
});

module.exports = mongoose.model('ReferenceValues', ReferenceValuesSchema);