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

// décodage des requêtes POST/PUT -> req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const homeRouter = require("./routes/homeRouter")
app.use("/", homeRouter);

const loginRouter = require("./routes/loginRouter")
app.use("/login", loginRouter);

module.exports = app;