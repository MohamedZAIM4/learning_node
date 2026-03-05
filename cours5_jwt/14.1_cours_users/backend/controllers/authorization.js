const jwt = require('jsonwebtoken') ;

// Le nom du cookie dans lequel le JWT sera stocké
const COOKIE_NAME = 'token' ;

// Le secret est sensible et a donc été mise dans le fichier .env (utilisation du module 'dotenv')
// (NB : il aura pu être générée dans un script externe avec le module 'crypto')
const SECRET_KEY = process.env.SECRET_KEY ;

// Pour les tests, le JWT ne sera valide que 30s
const EXPIRATION = '30s'

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
    if (!token) {
        // return res.sendStatus(403); // Stoppe le traitement en renvoyant une erreur 'forbidden'
        next();
    }else{

        // -> puisque le cookie existe, on va vérifier le token qu'il contient
        try {
            // Vérification et récupération du payload :
            const payload = jwt.verify(token, SECRET_KEY);

            // Envoie du payload au middleware suivant au travers de req :
            req.userId = payload.userId ;

            // Tout est ok : on exécute le handler/middleware suivant :
            next() ;

        } catch {
            // Le token n'était pas/plus valide :
            res.clearCookie(COOKIE_NAME) ; // On efface le cookie
            return res.sendStatus(403); // Stoppe le traitement en renvoyant une erreur 'forbidden'
        }

    }

    
}

module.exports.clearToken = (res)=>{
    res.clearCookie(COOKIE_NAME) ;
}
