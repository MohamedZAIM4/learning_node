var express = require('express');
var router = express.Router();

/* GET home page. */
const controller = require('../controllers/loginController')
router.get('/', controller.loginForm);

router.post('/', controller.login) ;

module.exports = router;