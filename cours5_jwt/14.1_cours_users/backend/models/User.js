const mongoose = require('mongoose') ;
const validator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({

    login: { type: String, required: true, unique: true },
    // 'unique: true' empêchera d'enregistrer plusieurs User avec le même login

    password: { type: String, required: true }
}) ;

// Activation de mongoose-unique-validator
userSchema.plugin(validator);

module.exports = mongoose.model('User', userSchema) ;

