const expres = require("express")
const multer=require('multer');
const {storage}=require('../config/cloudinary');
const userController =require("../controller/userController")
const authTocken=require("../middleware/authTocken")
let router=expres.Router();
let upload=multer({storage});

router.post("/signup",upload.single('profilePic'),userController.userSignUpController)
router.post("/signin",userController.userSignIn)
router.get("/user-details",authTocken.authTocken,userController.userDetails)

module.exports=router;