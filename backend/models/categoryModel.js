let mongoose=require ('mongoose')

let categorySchema=mongoose.Schema({
    name:String,
    isBlocked:{
        type:Boolean,
        default:false
    }
  
})

let categoryModel=mongoose.model("category",categorySchema)

module.exports=categoryModel;
