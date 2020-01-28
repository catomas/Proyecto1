const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es necesario']
    },

    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },

    location: {
        type: [String],
        required: false
    }


});

usuarioSchema.plugin(uniqueValidator, { message: '{PATH] debe de ser único' })

module.exports = mongoose.model('Usuario', usuarioSchema);