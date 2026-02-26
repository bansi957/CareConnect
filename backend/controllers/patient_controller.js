const User= require("../models/user_model")

const patientSignup=async(req,res)=>{
    try {
        const {fullName,email,password,phone,address,city,state,pincode}=req.body
        const user=await User.findOne({email:email})
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        const newUser=new User({fullName,email,password,phone,address,city,state,pincode})
        await newUser.save()
        return res.status(201).json({message:"User created successfully"    })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}

module.exports={patientSignup}  