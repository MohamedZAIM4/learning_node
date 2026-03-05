const authorization = require("./authorization") ;
const User = require('../models/User') ;

module.exports.home = (req, res)=>{

    // Si le token a été jugé valide par authorize, req contiendra le champ userId
    if (req.userId) {
        User.findById(req.userId)
        .then(user =>{
            res.render('pages/home', { user }) ;
        })
    }else{
        res.render('pages/home') ;
    }
    
}

module.exports.logout = (req, res)=>{
    authorization.clearToken(res) ;
    res.redirect('/') ;
}

module.exports.admin = (req, res)=>{

    // Si le token a été jugé valide par authorize, req contiendra le champ userId
    User.findById(req.userId)
        .then(user =>{
            if(user){
                res.render('pages/admin', { user }) ;
            }else{
                return res.sendStatus(403); // Stoppe le traitement en renvoyant une erreur 'forbidden'
            }
        })

}
