const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const actuatorsSchema = new Schema ({
    actuators: {
        type: [Number],
        validate: [arrayLimit, '{PATH} no puede exceder el limite de 4 posiciones']
    },
    date: {
        type: String,
        required: [true, 'fecha es requerida']
    },
    switch: {
        type: String,
    },
    flag: {
        type: Boolean,
        required: [true, 'La bandera flag es requerida']
    },
});

function arrayLimit (val) {
    return val.length <= 4;
}

module.exports = mongoose.model('Actuators', actuatorsSchema);