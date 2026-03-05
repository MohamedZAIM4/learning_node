const mongoose = require('mongoose') ;
const validator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({

    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String }

}) ;

// Activation de mongoose-unique-validator
userSchema.plugin(validator);

module.exports = mongoose.model('User', userSchema, 'users') ;

