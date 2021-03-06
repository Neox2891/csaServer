const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido!'
}

let Schema = mongoose.Schema;

let usersSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Es necesario el nombre!']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Es necesario el email!']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria!']
    },
    phone: {
        type: Number,
        required: [true, 'El telefono es obligatorio!']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos,
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    keyDevice: {
        type: String
    },
    date: {
        type: String
    }
});

usersSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;

}

usersSchema.plugin(uniqueValidator, '{PATH} debe de ser unico');

module.exports = mongoose.model('Users', usersSchema);