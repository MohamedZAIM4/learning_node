const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    // login : obligatoire et unique (pas 2 utilisateurs avec le même login)
    // 'unique: true' crée un index unique dans MongoDB
    // → si on essaie de créer un User avec un login qui existe déjà → erreur MongoDB
    login: { type: String, required: true, unique: true },

    // password : obligatoire (sera hashé avec bcrypt avant d'être stocké)
    password: { type: String, required: true }
});

// On stocke les users dans la collection 'users' de movies_db
module.exports = mongoose.model('User', userSchema, 'users');
