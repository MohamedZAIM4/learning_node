const authorization = require('../controllers/authorization');

module.exports.home = (req, res)=>{

    if(!req.userId){ // L'utilisateur n'est pas connecté
        res.render('pages/home.ejs');
    }else {
        const user = {
            login: req.userId
        }
        res.render('pages/userPage', { user });
    }
}

module.exports.loginForm = (req, res, next)=>{
    res.render('pages/loginForm');
}

module.exports.login = (req, res, next)=> {

    const login = 'tony';
    const password = 'warmachinerox' ;

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
        res.render("pages/loginForm", {error, login: data.login})
        return;
    }

    if(data.login === login){
        if(data.password === password){ // Si les passwords correspondent :
            // on envoie un JWT
            authorization.createToken(res, data.login);
            // et on peut rediriger vers une page protégée
            res.redirect(`/`);
        }else{ // Si les passwords ne correspondent pas :
            error.bad = "Bad password" ;
            res.render('pages/loginForm', { error , login : data.login });
        }
    }else{
        error.bad = "No such User" ;
        res.render('pages/loginForm', { error , login : data.login });
    }


}

module.exports.logout = (req, res)=>{
    authorization.clearToken(res) ;
    res.redirect('/') ;
}