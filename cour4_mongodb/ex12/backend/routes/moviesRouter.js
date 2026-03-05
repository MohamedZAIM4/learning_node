const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/moviesController');

router.get('/', moviesController.list);

router.get('/create', moviesController.createForm)
router.post('/create', moviesController.create)

router.get('/:id', moviesController.select)

router.get('/update/:id', moviesController.updateForm)
router.post('/update/:id', moviesController.update)

router.get('/delete/:id', moviesController.delete);

module.exports = router;
