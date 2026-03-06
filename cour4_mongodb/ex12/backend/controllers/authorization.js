const jwt = require('jsonwebtoken');

// Le nom du cookie dans lequel le JWT sera stocké
const COOKIE_NAME = 'token';

// Le secret est dans le fichier .env (chargé par dotenv dans server.js)
const SECRET_KEY = process.env.SECRET_KEY;

// Durée de validité du JWT (1 heure)
const EXPIRATION = '1h';

// ============================================
// createToken : crée un JWT et le stocke dans un cookie
// On met userId ET role dans le payload du token
// ============================================
module.exports.createToken = (res, userId, role) => {

    const token = jwt.sign(
        { userId, role },     // payload : userId + role voyagent dans le token
        SECRET_KEY,
        { expiresIn: EXPIRATION }
    );

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
        const payload = jwt.verify(token, SECRET_KEY);
        req.userId = payload.userId;
        req.userRole = payload.role;  // On récupère aussi le rôle !
        next();
    } catch {
        res.clearCookie(COOKIE_NAME);
        return res.redirect('/user/login');
    }
};

// ============================================
// authorizeRole : middleware qui vérifie le RÔLE de l'utilisateur
// Usage : authorizeRole('admin') ou authorizeRole('admin', 'moderator')
// DOIT être placé APRÈS authorize dans la chaîne de middlewares
// ============================================
module.exports.authorizeRole = (...allowedRoles) => {
    // Retourne un middleware qui vérifie si le rôle est autorisé
    return (req, res, next) => {
        if (!allowedRoles.includes(req.userRole)) {
            return res.status(403).send('Accès interdit : rôle insuffisant');
        }
        next();
    };
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
            res.locals.userRole = payload.role;  // Accessible dans les vues EJS
            req.userId = payload.userId;
            req.userRole = payload.role;
        } catch {
            res.locals.isLoggedIn = false;
            res.locals.userRole = null;
        }
    } else {
        res.locals.isLoggedIn = false;
        res.locals.userRole = null;
    }
    next();
};

// ============================================
// clearToken : supprime le cookie JWT (déconnexion)
// ============================================
module.exports.clearToken = (res) => {
    res.clearCookie(COOKIE_NAME);
};
