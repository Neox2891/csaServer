const mongoose = require('mongoose');


let Schema = mongoose.Schema;


let notificationsSchema = new Schema({
    notificacion: String,
    module: String,
    parameter: String,
    data: Number,
    date: String,
    email: String
});

module.exports = mongoose.model('Notificaciones', notificationsSchema);