const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    // login : obligatoire et unique
    login: { type: String, required: true, unique: true },

    // password : obligatoire (hashé avec bcrypt)
    password: { type: String, required: true },

    // role : le rôle de l'utilisateur
    // 'user' = utilisateur normal (par défaut)
    // 'admin' = administrateur (peut tout faire)
    role: { type: String, default: 'user', enum: ['user', 'admin'] }
    //                      ↑ par défaut          ↑ valeurs autorisées uniquement
});

// On stocke les users dans la collection 'users' de movies_db
module.exports = mongoose.model('User', userSchema, 'users');
