const mongoose = require('mongoose') ;

const movieSchema = mongoose.Schema({

    // NB : le champ _id est automatiquement créé

    title: { type: String, required: true },
    synopsis: { type: String, default: "No synopsis available yet !" },
    image: { type: String }
}) ;

// Si on ne précise pas le nom de la collection, un nom basé sur le nom du Schéma
// est automatiquement créé : schéma Movie -> collection movies
module.exports = mongoose.model('Movie', movieSchema) ;

// NB : on aurait pu donner un nom de collection personnalisé -> ex. 'oldmovies'
// module.exports = mongoose.model('Movie', movieSchema, 'oldmovies') ;