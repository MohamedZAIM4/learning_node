const User = require("../models/User");
const bcrypt = require("bcrypt");
const authorization = require("./authorization");

module.exports.home = (req, res)=>{

    if(!req.userId){ // L'utilisateur n'est pas connecté
        return res.render('pages/home.ejs');
    }else {
        User.findById(req.userId)
            .then((user) => {
                if (user) {
                    return res.render('pages/userPage', {user});
                }else {
                    error.bad = "No such User" ;
                    return res.render('pages/loginForm', { error , login : data.login });
                }
            })
            .catch(error => console.log(error));
    }
}

module.exports.loginForm = (req, res, next)=>{
    return res.render('pages/loginForm');
}

module.exports.login = (req, res, next)=> {

    // récupération des données du POST
    let data = req.body;

    let error = {};
    if (!data.login || data.login === '') {
        error.login = "User name should not be empty";
    }
    if (!data.password || data.password === '') {
        error.password = "Password should not be empty";
    }

    if (Object.keys(error).length > 0) {
        return res.render("pages/loginForm", {error, login: data.login})
    }

    User.findOne({ login: data.login })
        .then((user) => {

            // Si l'utilisateur n'est pas enregistré dans la DB, on envoie un message d'erreur
            if(!user) {
                error.bad = "No such User" ;
                return res.render('pages/loginForm', { error , login : data.login });

            }else {

                // Si un utilisateur a été trouvé, on vérifie le password
                bcrypt.compare(data.password, user.password)
                    .then(ok=>{
                        if(ok){ // Si les passwords correspondent :
                            // on envoie un JWT
                            authorization.createToken(res, user._id);
                            // et on peut rediriger vers une page protégée
                            return res.redirect(`/`);
                        }else{ // Si les passwords ne correspondent pas :
                            error.bad = "Bad password" ;
                            return res.render('pages/loginForm', { error , login : data.login });
                        }
                    })

            }
        })
        .catch(error => {
            error.bad = "Connexion Problem" ;
           return res.render('pages/loginForm', { error , login : data.login });
        });

}

module.exports.logout = (req, res)=>{
    authorization.clearToken(res) ;
    return res.redirect('/') ;
}