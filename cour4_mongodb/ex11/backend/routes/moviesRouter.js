const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/moviesController');

// ROUTE 1: GET /movies
// Affiche la liste de tous les films
router.get('/', moviesController.list);

// ROUTE 2: GET /movies/add
// Affiche le formulaire pour ajouter un film.
router.get('/add', moviesController.addForm);

// ROUTE 3: POST /movies/add
// Reçoit les données du formulaire quand l'utilisateur clique sur "Submit" et crée le film en base de données.
router.post('/add', moviesController.addSubmit);

// ROUTE 4: GET /movies/edit/:id
// Affiche le formulaire pré-rempli pour modifier un film existant (:id est un paramètre dynamique)
router.get('/edit/:id', moviesController.editForm);

// ROUTE 5: POST /movies/edit/:id
// Reçoit les données modifiées et met à jour le film dans la base de données
router.post('/edit/:id', moviesController.editSubmit);

// ROUTE 6: POST /movies/delete/:id
// Supprime un film de la base de données
router.post('/delete/:id', moviesController.delete);

module.exports = router;
