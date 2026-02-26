const jwt=require("jsonwebtoken")

const auth_Middleware=async(req,res,next)=>{
    try {
        const token=req.cookies.token
        if(!token){
            return res.status(401).json({message:"Unauthorized"})
        }
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET)
        req.userId=decodedToken.userId
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}

module.exports=auth_Middleware