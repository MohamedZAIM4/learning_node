const express = require('express');
const router = express.Router();

const controller = require('../controllers/homeController')
const authorization = require('../controllers/authorization');

router.get('/', authorization.authorize, controller.home);

router.get('/login', controller.loginForm);
router.post('/login', controller.login) ;

router.get('/logout', controller.logout);


module.exports = router;