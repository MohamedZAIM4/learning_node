const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');
const authorization = require('../controllers/authorization');

router.get('/', authorization.authorize, mainController.home);

// Route protégée par le middleware authorization.authorize :
router.get('/admin', authorization.authorize, mainController.admin);

module.exports = router;