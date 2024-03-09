const jwt=require("jsonwebtoken")


const verifyToken=(req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        res.status(404).json({message:"user is not Login"})
    }
    jwt.verify(token,process.env.JWT_SECRET,async(err,data)=>{
        if(err){
            res.status(500).json({message:"token is not matched"})
        }
        req.userId=data._id
        next()
    })
}

module.exports=verifyToken