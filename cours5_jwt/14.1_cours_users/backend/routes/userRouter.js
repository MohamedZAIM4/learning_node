const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');
const authorization = require('../controllers/authorization');

router.get('/create', authorization.authorize, controller.userCreateForm) ;
router.post('/create', authorization.authorize, controller.userCreate) ;

router.get('/login', controller.userLoginForm) ;
router.post('/login', controller.userLogin) ;

router.get('/logout', controller.userLogout) ;

module.exports = router;