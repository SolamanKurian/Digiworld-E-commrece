const expres = require("express")
const multer = require("multer");
const upload = multer();
const adminController=require("../controller/adminControllers/adminController")
const adminAuthTocken=require("../middleware/adminAuthTocken")

let adminRouter=expres.Router();

adminRouter.post('/signin',adminController.adminLogin)
adminRouter.get('/authCheck',adminAuthTocken.adminAuthTocken,adminController.authStatus)
adminRouter.get('/getUsers',adminAuthTocken.adminAuthTocken,adminController.getUsers)
adminRouter.get('/blockUnblockUser',adminAuthTocken.adminAuthTocken,adminController.blockUnblockUser)
adminRouter.post('/addCategory',upload.none(),adminAuthTocken.adminAuthTocken,adminController.addCategory)
adminRouter.get('/getCategories',adminAuthTocken.adminAuthTocken,adminController.getCategories)

module.exports=adminRouter;