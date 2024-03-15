const mongoose=require('mongoose');
const User=require('../model/user');
const Post=require('../model/Post');
const Comment=require('../model/comment');
const Replies=require('../model/Replies');


exports.addcomment=async(req,res)=>{
    const post_id=req.params.post_id;
    const {user_id,text}=req.body;
    
    try{
        const post=await Post.findById(post_id);
        if(!post){
            res.status(404).json({messsge:"Post is not available"});
        }
        const newcomment=new Comment({
            user:user_id,
            text:text,
            post:post_id
        })
        await newcomment.save();
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server Error"});
       }
    }


