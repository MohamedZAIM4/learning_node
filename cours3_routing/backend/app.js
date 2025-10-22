require("dotenv").config({path :'./.env'})

const express=require("express")

const app = express();

const path= require('path')

app.use(express.static(path.join(__dirname,'./public')))

app.use((req,res,next)=>{
    const now=new Date().toDateString();
    console.log(`${now} : une requete de type ${req.method} est arrivée !`);
    next();
})

app.get("/",(req,res)=>{
    res.send('<h1>Hello to The Routing Course: Root</h1>')
})

// Route déclenchée uniquement pour une méthode GET sur l'URL "/about" 
app.get("/about",(req,res)=>{
    res.send('<p>This course is a mini summary of the official documentation Express.js</p>')
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