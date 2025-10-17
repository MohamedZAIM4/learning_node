// Charge les variables d'environnement définies dans .env
require ('dotenv').config({path:'./.env'})

// Définition du n° du port sur lequel le serveur va écouter
// (ce sera la valeur système process.env.PORT si elle existe, 3000 sinon)
const port = process.env.PORT || 3000; // installer dotenv d'abord

// Inclusion du module prédéfini de node.js permettant d'executer un serveur http
const http=require("http")
 
// Ce serveur très simple reverra toujours la même réponse :
// - un code http 200
// - un header spécifiant l'encodage de la réponse
// - le message "Le serveur Node.js dit <b>bonjour</b>"

const serveur = http.createServer((req,res)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/html;charset=utf-8')
    res.end("le serveur Node.js dit <strong>Bonjour<strong>")
})

// Démarrage de l'écoute des requêtes sur le port indiqué
serveur.listen(port,()=>{
    console.log(`Le serveur écoute sur http://127.0.0.1:${port}/`)
})