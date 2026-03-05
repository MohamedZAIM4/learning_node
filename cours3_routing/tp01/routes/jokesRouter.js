const express = require("express");
const router = express.Router();

const jokesController = require("../controllers/jokesController");
router.get("/all", jokesController.all);
router.get("/random", jokesController.random);

module.exports = router;
