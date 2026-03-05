const jwt = require('jsonwebtoken');

// Le nom du cookie dans lequel le JWT sera stocké
const COOKIE_NAME = 'token';

// Le secret est dans le fichier .env (chargé par dotenv dans server.js)
const SECRET_KEY = process.env.SECRET_KEY;

// Durée de validité du JWT (1 heure)
const EXPIRATION = '1h';

// ============================================
// createToken : crée un JWT et le stocke dans un cookie
// ============================================
module.exports.createToken = (res, userId) => {

    // 1. Création du token avec le userId dans le payload
    const token = jwt.sign(
        { userId },           // payload : les données qu'on veut stocker dans le token
        SECRET_KEY,           // la clé secrète pour signer le token
        { expiresIn: EXPIRATION }  // le token expire après 1h
    );

    // 2. On stocke le token dans un cookie httpOnly
    //    httpOnly = le cookie n'est PAS accessible par le JavaScript côté client (sécurité)
    res.cookie(COOKIE_NAME, token, { httpOnly: true });
};

// ============================================
// authorize : middleware qui vérifie le JWT
// Si valide → next() (on passe au handler suivant)
// Si invalide → redirect vers /user/login
// ============================================
module.exports.authorize = (req, res, next) => {

    // 1. Récupération du cookie contenant le token
    const token = req.cookies[COOKIE_NAME];

    // 2. Si le cookie n'existe pas → pas connecté
    if (!token) {
        return res.redirect('/user/login');
    }

    // 3. Vérification du token
    try {
        // jwt.verify décode le token et vérifie la signature + l'expiration
        const payload = jwt.verify(token, SECRET_KEY);

        // On place le userId du payload dans req pour le rendre accessible
        // aux handlers/middlewares suivants
        req.userId = payload.userId;

        // Tout est OK → on passe au handler suivant
        next();

    } catch {
        // Le token n'est pas/plus valide (expiré, modifié, etc.)
        res.clearCookie(COOKIE_NAME);  // On efface le cookie
        return res.redirect('/user/login');
    }
};

// ============================================
// checkAuth : middleware qui vérifie si l'utilisateur est connecté
// SANS bloquer (pas de redirect). Juste pour la navbar.
// Met res.locals.isLoggedIn = true/false accessible dans TOUTES les vues EJS
// ============================================
module.exports.checkAuth = (req, res, next) => {
    const token = req.cookies[COOKIE_NAME];
    if (token) {
        try {
            const payload = jwt.verify(token, SECRET_KEY);
            res.locals.isLoggedIn = true;
            req.userId = payload.userId;
        } catch {
            res.locals.isLoggedIn = false;
        }
    } else {
        res.locals.isLoggedIn = false;
    }
    next();
};

// ============================================
// clearToken : supprime le cookie JWT (déconnexion)
// ============================================
module.exports.clearToken = (res) => {
    res.clearCookie(COOKIE_NAME);
};
