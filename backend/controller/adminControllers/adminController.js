const adminModel=require("../../models/adminModel")
const userModel = require("../../models/userModel");
const categoryModel=require("../../models/categoryModel");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

const verifyPassword= async(password,hash)=>{
    try {
        const isMatch = await bcrypt.compare(password,hash);
    return isMatch;
    } catch (error) {
        throw new Error("Something wrong in password matching");
    }
}

const adminLogin=async(req,res)=>{
    try {
let admin=await adminModel.findOne({name:req.body.name});

if(admin){
    let passmatch=await verifyPassword(req.body.password,admin.password);  
    if(passmatch){
        const token = jwt.sign({_id:admin._id}, process.env.TOCKEN_SECRET, {
            expiresIn: "1d",
          });
          res.status(200).json({
            token: token,
            message: "LogedIn succesfully"
          })
    }
}else{
    throw new Error("admin not found");
    
}

        
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: true,
            success: false,
          });
    }

}
const authStatus=(req,res)=>{
    try {
       
            res.status(200).json({
                message: "Admin Authenticated"
              })
       
        
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: true,
            success: false,
          });
    }

}
const getUsers=async (req,res)=>{
    try {
        let page=parseInt(req.query.page) || 1;
        let limit=parseInt(req.query.limit) || 10;
        let skip=(page-1)*limit;
        let searchQuery=req.query.searchQuery;
        let searchRegex = new RegExp(searchQuery, 'i');
        const totalUsers = await userModel.countDocuments({name: searchRegex});
        let totalPages=Math.ceil(totalUsers/limit)
       let users=await userModel.find({name: searchRegex}).sort({ createdAt: -1 }).skip(skip).limit(limit);
        res.status(200).json({users,totalPages, success:true});
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: true,
            success: false,
          });
    }
}
const blockUnblockUser=async (req,res)=>{
    try {
        let user=await userModel.findOne({_id:req.query.userId})
        if(user){
            user.isBlocked=!user.isBlocked;
            await user.save();
            let updatedUser=await userModel.findOne({_id:req.query.userId})
            res.json({
                User:updatedUser
            })
        }else{
            throw new Error("user not found");
        }
        
        
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: true,
            success: false,
          });
    }
}

const addCategory=async(req,res)=>{
    try {
        let categoryAlready=await categoryModel.findOne({name:req.body.name});
        if (categoryAlready) {
            throw new Error("Category already exists");
          }
          let categoryData=new categoryModel({
            name:req.body.name
          })
          let saveData = await categoryData.save();
          if (saveData) {
            res.status(201).json({
              data: saveData,
              success: true,
              error: false,
              message: "Category added succesfully",
            });
          }
        
    } catch (error) {
        console.error("Error in category adding:", error);
    res.json({
      message: error.message,
      error: true,
      success: false,
    });
        
    }
}
const getCategories=async(req,res)=>{
    try {
        let page=parseInt(req.query.page)||1;
        let limit=parseInt(req.query.limit) || 5;
        let skip=(page-1)*limit;
        let searchQuery=req.query.searchQuery;
        let searchRegex = new RegExp(searchQuery, 'i');
        const totalCategories = await categoryModel.countDocuments({name: searchRegex});
        let totalPages=Math.ceil(totalCategories/limit)
        let categories=await categoryModel.find({name: searchRegex}).sort({ createdAt: -1 }).skip(skip).limit(limit);
        res.status(200).json({categories,totalPages, success:true});

    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: true,
            success: false,
          });
    }
}

module.exports={
    adminLogin,
    authStatus,
    getUsers,
    blockUnblockUser,
    addCategory,
    getCategories
}