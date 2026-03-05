const bcrypt = require('bcrypt');
const User = require('../models/User');
const authorization = require('./authorization');

// ============================================
// REGISTER - Afficher le formulaire d'inscription
// GET /user/register
// ============================================
module.exports.registerForm = (req, res) => {
    res.render('pages/register');
};

// ============================================
// REGISTER - Traiter le formulaire d'inscription
// POST /user/register
// ============================================
module.exports.register = (req, res) => {

    // Étape 1 : Hasher le password avec bcrypt (10 passes de salage)
    // On ne stocke JAMAIS un mot de passe en clair dans la DB !
    bcrypt.hash(req.body.password, 10)
        .then(hashedPassword => {

            // Étape 2 : Créer un nouvel objet User avec le login et le password hashé
            const user = new User({
                login: req.body.login,
                password: hashedPassword
            });

            // Étape 3 : Sauvegarder dans MongoDB
            user.save()
                .then(() => {
                    // Inscription réussie → rediriger vers la page de login
                    res.redirect('/user/login');
                })
                .catch(error => {
                    // Erreur (ex: login déjà pris grâce à mongoose-unique-validator)
                    console.error('Erreur register:', error);
                    res.status(400).send('Erreur lors de l\'inscription. Login déjà utilisé ?');
                });
        })
        .catch(error => {
            console.error('Erreur bcrypt:', error);
            res.status(500).send('Erreur serveur');
        });
};

// ============================================
// LOGIN - Afficher le formulaire de connexion
// GET /user/login
// ============================================
module.exports.loginForm = (req, res) => {
    res.render('pages/login');
};

// ============================================
// LOGIN - Traiter le formulaire de connexion
// POST /user/login
// ============================================
module.exports.login = (req, res) => {

    // Étape 1 : Chercher l'utilisateur par son login dans MongoDB
    User.findOne({ login: req.body.login })
        .then(user => {

            // Étape 2 : Si aucun utilisateur trouvé → erreur
            if (!user) {
                return res.status(401).send('Utilisateur non trouvé');
            }

            // Étape 3 : Comparer le password du formulaire avec le hash en DB
            // bcrypt.compare prend le password en clair et le hash, et retourne true/false
            bcrypt.compare(req.body.password, user.password)
                .then(ok => {
                    if (ok) {
                        // Étape 4 : Passwords correspondent → créer un JWT
                        authorization.createToken(res, user._id);
                        // Rediriger vers la liste des films (route protégée)
                        return res.redirect('/movies');
                    } else {
                        // Passwords ne correspondent pas
                        return res.status(401).send('Mot de passe incorrect');
                    }
                });
        })
        .catch(error => {
            console.error('Erreur login:', error);
            return res.status(500).send('Erreur serveur');
        });
};

// ============================================
// LOGOUT - Déconnecter l'utilisateur
// GET /user/logout
// ============================================
module.exports.logout = (req, res) => {
    // Supprimer le cookie contenant le JWT
    authorization.clearToken(res);
    // Rediriger vers la page d'accueil
    res.redirect('/');
};
