const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// --- INSCRIPTION ---
router.get('/register', userController.registerForm);   // Affiche le formulaire
router.post('/register', userController.register);       // Traite le formulaire

// --- CONNEXION ---
router.get('/login', userController.loginForm);          // Affiche le formulaire
router.post('/login', userController.login);             // Traite le formulaire

// --- DÉCONNEXION ---
router.get('/logout', userController.logout);

module.exports = router;
