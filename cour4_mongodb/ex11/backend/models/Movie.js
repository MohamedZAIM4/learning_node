const mongoose = require('mongoose') ;

const movieSchema = mongoose.Schema({
    // NB : le champ _id est automatiquement créé
    title: { type: String, required: true },
    synopsis: { type: String, default: "No synopsis available yet !" }

}) ;

module.exports = mongoose.model('Movie', movieSchema) ;
// Equivalent à :
// module.exports = mongoose.model('Movie', movieSchema, 'movies') ;
// car si on ne précise pas le nom de la collection, un nom basé sur le nom du Schéma
// est automatiquement utilisé : schéma 'Movie' -> collection 'movies'.

// NB : on aurait pu donner un nom de collection personnalisé -> ex. 'oldmovies'
// module.exports = mongoose.model('Movie', movieSchema, 'oldmovies') ;
