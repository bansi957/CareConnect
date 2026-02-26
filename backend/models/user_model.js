const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    fullName:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    password:{type:String,required:true},
    address:{type:String,required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},
    pincode:{type:String,required:true},    
})

module.exports=mongoose.model("User",userSchema)
