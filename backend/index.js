const express= require("express")
const cors=require("cors")
require("dotenv").config()
const connectDB = require("./config/db")
let router=require("./routes/index");
let adminRouter=require("./routes/adminRouter")
let cookieParser = require('cookie-parser')
const app=express()
const coraOptions={
    origin : process.env.FRONTEND_URL,
    credentials:true
}
app.use(express.json())
app.use(cookieParser())

app.use(cors(coraOptions))

app.use("/api",router)
app.use("/admin",adminRouter)


const PORT=8080 || process.env.PORT
connectDB().then(()=>{
    console.log("DB Connected");
     app.listen(PORT,()=>{
        console.log("Server is running");
})  
})