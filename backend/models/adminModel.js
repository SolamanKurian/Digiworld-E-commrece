let mongoose=require ('mongoose')

let adminSchema=mongoose.Schema({
    name:String,
    password: {type:String},
  
})

let adminModel=mongoose.model("admin",adminSchema)

module.exports=adminModel;
