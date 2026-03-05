var express = require("express");
var router = express.Router();

const jokesController = require("../controllers/jokesController");
router.get("/list", jokesController.list);

router.get("/random", jokesController.random);

router.get("/joke/:id", jokesController.show);
module.exports = router;
