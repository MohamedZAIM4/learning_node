var express = require('express');
var router = express.Router();

/* GET home page. */
const homeController = require('../controllers/homeController')
router.get('/', homeController.home);

module.exports = router;