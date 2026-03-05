module.exports.loginForm = (req, res, next)=>{
    res.render('pages/loginForm');
}

module.exports.login = (req, res, next)=>{

    // récupération des données du POST
    let data = req.body ;

    let error = {} ;
    if(!data.username || data.username === ''){
        error.username = "User name should not be empty" ;
    }
    if(!data.password || data.password === ''){
        error.password = "Password should not be empty" ;
    }

    if(Object.keys(error).length > 0){
        res.render("pages/loginForm", { error , username : data.username})
        return;
    }

    if(data.username == 'stark' & data.password == 'warmachinerox'){
        res.render("pages/loginOk", { nick : 'tony' })
        return ;
    }else{
        error.bad = "Bad credentials" ;
        res.render('pages/loginForm', { error , username : data.username });
    }
}
