// Importation du module mongoose
const mongoose = require('mongoose');

// Connection mongoose à MongoDB : VERSION ATLAS
// const db_name = 'users_db' ;
// const host = process.env.MONGO_HOST
// const user = process.env.MONGO_USER ;
// const pwd = process.env.MONGO_PWD ;
// const mongoDB = `mongodb+srv://${user}:${pwd}@${host}/${db_name}?retryWrites=true&w=majority` ;

// Connection mongoose à MongoDB : VERSION mongod
const db_name = 'movies_db' ;
const host = process.env.MONGO_HOST
const port = process.env.MONGO_PORT 
const mongoDB = `mongodb://${host}:${port}/${db_name}?retryWrites=true&w=majority` ;

mongoose.connect(mongoDB, { useUnifiedTopology: true })
    .then(() => console.log('MongoDB OK !'))
    .catch(() => console.log('MongoDB ERREUR !'));

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


