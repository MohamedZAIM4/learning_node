const bcrypt = require('bcrypt') ;
const User = require("../models/User");
const authorization = require("../controllers/authorization");

module.exports.userCreateForm = (req, res) =>{
    User.findById(req.userId)
        .then(user =>{
            res.render('pages/userCreate', { user }) ;
        })
}

module.exports.userCreate = async (req, res) =>{ // le async n'est utile que si on utilise le await (en commentaire ci-dessous)

    // Juste pour le tp, on va laisser n'importe qui créer une nouvel utilisateur
    // mais on devrait normalement bloquer la route pour un user non autorisé avec :
    // user = await User.findById(req.userId)
    // if(!user){
    //     return res.sendStatus(403); // Stoppe le traitement en renvoyant une erreur 'forbidden'
    // }

    bcrypt.hash(req.body.password, 10) // Cryptage (en 10 passes) du password
        .then(pwd => {

            // Instanciation du nouvel utilisateur
            const user = new User({
                login: req.body.login,
                password: pwd
            });

            // enregistrement dans la DB
            user.save()
                .then((user) => res.status(201).send(`User successfully created`))
                .catch(error => {
                    return res.status(400).send( error )
                });
        })
        .catch(error => {
            return res.status(500).send( error )
        });
}

module.exports.userLoginForm = (req, res) =>{
    res.render('pages/userLogin') ;
}

module.exports.userLogin = (req, res) =>{
    // Recherche de l'utilisateur dans MongoDB
    User.findOne({ login: req.body.login })
        .then((user) => {

            // Si l'utilisateur n'est pas enregistré dans la DB, on envoie un message d'erreur
            if(!user) {
                res.status(401).send('No such user') ; // Ceci devrait être amélioré !
                return ;
            }

            // Si un utilisateur a été trouvé, on vérifie le password
            bcrypt.compare(req.body.password, user.password)
                .then(ok=>{
                    if(ok){ // Si les passwords correspondent :
                        // on envoie un JWT
                        authorization.createToken(res, user._id);
                        // et on peut rediriger vers une page protégée
                        res.redirect('/admin');
                    }else{ // Si les passwords ne correspondent pas :
                        res.status(401).send('Bad Credentials') ; // Ceci devrait être amélioré !
                        return ;
                    }
                })
        })
        .catch(error => {
            res.status(500).send( error ) // Ceci devrait être amélioré !
        });
}

module.exports.userLogout = (req, res)=>{
    authorization.clearToken(res) ;
    res.redirect('/') ;
}
