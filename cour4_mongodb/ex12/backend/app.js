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

// décodage des requêtes POST/PUT
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// npm install mongoose
// script d'initialisation de mongoose
require("./controllers/mongoose_init")

// --- ROUTES ---
const homeRouter = require("./routes/homeRouter");
app.use("/", homeRouter);

const  moviesRouter = require("./routes/moviesRouter");
app.use("/movies", moviesRouter);

module.exports = app;