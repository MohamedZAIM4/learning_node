require("dotenv").config({path :'./.env'})

const express=require("express")

const app = express();

const path= require('path')

app.use(express.static(path.join(__dirname,'./public')))

// EJS Engine
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'./views'))


// EJS Layouts
const expressLayouts= require('express-ejs-layouts');

app.use(expressLayouts)

// Définition du Layout par défaut :
app.set('layout','../views/layouts/layouts')

app.use((req,res,next)=>{
    const now=new Date().toDateString();
    console.log(`${now} : une requete de type ${req.method} est arrivée !`);
    next();
})

app.get("/",(req,res)=>{
    res.render('pages/index', { title: 'Accueil' })
})

// Route déclenchée uniquement pour une méthode GET sur l'URL "/about" 
app.get("/about",(req,res)=>{
    res.render('pages/about', { title: 'À propos' });
})

// Route déclenchée uniquement pour toute requête non matchée précédement
// Attention : L'ORDRE DE Déclaration est Important
// The new version : * don't work you need to add splat
app.get('/*splat',(req,res)=>{
    // res.send('<p>... Je ne sais pas quoi dire... CHYATA </p>')
    res.redirect('/')
})

const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`your server is running at http://127.0.0.1:${port}/`)
})