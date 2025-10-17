require('dotenv').config({path: './.env'})

const express = require('express'); // inclusion d'express
const app = express(); // Instanciation d'une application express


const path= require("path");


// Chargement des fichiers statiques : Tjrs en 1er
app.use(express.static(path.join(__dirname,'public')));

// Set the engine
app.set('view engine','ejs');// Définition du moteur de rendu
app.set('views',path.join(__dirname,'views'))


//importation de 'express-ejs-layouts'
const expressLayouts=require('express-ejs-layouts');

//ajout du middleware
app.use(expressLayouts)

// Définition du Layout par défaut :
app.set('layout', '../views/layouts/layout');




app.use((req,res,next)=> {
    const now=new Date().toDateString();
    console.log(`${now} : une requête ${req.method} est arrivée !`);
    next();
});

// // Configuration de l'application : une première gestion "basique" des requêtes.
// app.use((req, res) => {
//     res.sendFile(path.join(__dirname,'public/pages/index.html'))
// })

// Utiliser le rendu de la vue home.ejs 
app.use((req,res)=>{
    res.render('pages/home.ejs', {nickname:'Mohamed', sex:'H'});
})

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Le server écoute sur http://127.0.01:${port}/`);
});