const port = process.env.PORT || 3000
const express = require('express');
const app = express();

// dossier public (pour le css, etc.)
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// définition du view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // npm install --save ejs
const expressLayouts = require('express-ejs-layouts'); //npm install express-ejs-layouts
app.use(expressLayouts);
app.set('layout', '../views/layouts/layout') ; // définit le layout par défaut


// --- ROUTAGE ---

const homeRouter = require('./routes/homeRouter')
app.use('/', homeRouter)

const jokesRouter = require('./routes/jokesRouter')
app.use('/jokes', jokesRouter)



// -- LANCEMENT DU SERVEUR ---
app.listen(port, ()=>{
    console.log(`Le server écoute sur http://127.0.0.1:${port}`);
}) ;