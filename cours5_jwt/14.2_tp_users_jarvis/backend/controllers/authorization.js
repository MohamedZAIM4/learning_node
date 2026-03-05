const jwt = require('jsonwebtoken') ;

// Le nom du cookie dans lequel le JWT sera stocké
const COOKIE_NAME = 'token' ;

// Le secret est sensible et a donc été mise dans le fichier .env (utilisation du module 'dotenv')
// (NB : il aura pu être générée dans un script externe avec le module 'crypto')
const SECRET_KEY = process.env.SECRET_KEY ;

// Pour les tests, le JWT ne sera valide que 30s
const EXPIRATION = 15*60+'s' ;

module.exports.createToken = (res, userId)=>{

    // Création du token
    const token = jwt.sign(
        { userId },
        SECRET_KEY,
        { expiresIn: EXPIRATION });

    // Enregistrement du token dans un cookie
    res.cookie(COOKIE_NAME, token, { httpOnly: true })
}

module.exports.authorize = (req, res, next)=>{

    // Récupération du cookie
    const token = req.cookies[COOKIE_NAME];

    // On vérifie si le cookie existe
    if (!token) { ;
        // console.log('NO TOKEN') ;
        next() ; // on continue non connecté
    }else{
        // console.log('TOKEN FOUND') ;
        // Puisque le cookie existe, on va vérifier le token qu'il contient
        try {
            // Vérification et récupération du payload :
            const payload = jwt.verify(token, SECRET_KEY);

            // console.log('TOKEN OK') ;

            // Envoie du payload au middleware suivant au travers de req :
            req.userId = payload.userId ;

            // Tout est ok : on exécute le handler/middleware suivant :
            next() ;

        } catch {
            // Le token est erroné
            // console.log('BAD TOKEN') ;
            res.clearCookie(COOKIE_NAME) ;
            next() ; // on continue non connecté
        }
    }

}

module.exports.clearToken = (res)=>{
    res.clearCookie(COOKIE_NAME) ;
}
