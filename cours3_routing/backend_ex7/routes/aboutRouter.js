const express= require("express")
const router= express.Router();

const aboutController= require('../controllers/aboutController')
router.get('/',aboutController.home)

module.exports=router;