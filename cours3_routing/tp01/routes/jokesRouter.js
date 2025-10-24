const express=require('express')
const router=express.Router()

const jokesController = require('../controllers/jokesController')
router.get('/all',jokesController.all);
router.get('/random',jokesController.random);

router.get('/*splat',(req,res)=>{
    console.log("you call me i m chyata 2")

    // res.send('<p>... Je ne sais pas quoi dire... CHYATA </p>')
    res.redirect('/jokes/all')
})
module.exports = router;