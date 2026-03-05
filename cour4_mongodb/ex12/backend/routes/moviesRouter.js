const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/moviesController');
const authorization = require('../controllers/authorization');

// Toutes les routes sont protégées par authorization.authorize
// → l'utilisateur DOIT être connecté (avoir un JWT valide) pour accéder

router.get('/', authorization.authorize, moviesController.list);

router.get('/create', authorization.authorize, moviesController.createForm)
router.post('/create', authorization.authorize, moviesController.create)

router.get('/:id', authorization.authorize, moviesController.select)

router.get('/update/:id', authorization.authorize, moviesController.updateForm)
router.post('/update/:id', authorization.authorize, moviesController.update)

router.get('/delete/:id', authorization.authorize, moviesController.delete);

module.exports = router;
