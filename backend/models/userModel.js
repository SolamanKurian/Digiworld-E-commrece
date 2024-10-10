let mongoose=require ('mongoose')

let userSchema=mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        required:true
    },
    password: {type:String},
    profilePic:{type:String},
    isBlocked:{
        type:Boolean,
        default:false
    }
},{
    timestamps: true 
})

let userModel=mongoose.model("user",userSchema)

module.exports=userModel
