
    // Importation du module mongoose
    const mongoose = require('mongoose');

    // Connexion à un serveur MongoDB local sans gestion des accès
    const host = '127.0.0.1' ;
    const port = '27017'
    const db_name = 'movies_db' ;
    const mongoDB = `mongodb://${host}:${port}/${db_name}?retryWrites=true&w=majority` ;

    mongoose.connect(mongoDB, { useUnifiedTopology: true })
        .then(() => console.log('MongoDB OK !'))
        .catch(() => console.log('MongoDB ERREUR !'));

    // Get the default connection
    const db = mongoose.connection;

    // Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));


