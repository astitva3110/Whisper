const jwt=require("jsonwebtoken")
require('dotenv').config();

const verifyToken=(req,res,next)=>{
    console.log("Cookies:", req.cookies);
    const token=req.cookies && req.cookies.token
    if(!token){
        res.status(404).json({message:"user is not Login"})
    }
    jwt.verify(token,process.env.JWT_KEY,async(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).json({message:"token is not matched"})
        }
        
        next()
    })
}

module.exports=verifyToken;