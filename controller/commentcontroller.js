const mongoose=require('mongoose');
const User=require('../model/user');
const Post=require('../model/Post');
const Comment=require('../model/comment');


exports.addcomment=async(req,res)=>{
    const postId=req.params.post_id;
    const {user_id,text}=req.body;
    
    try{
        const post=await Post.findById(postId);
        if(!post){
            res.status(404).json({messsge:"Post is not available"});
        }
        const newcomment=new Comment({
            user:user_id,
            text:text,
            post:postId
        })
        await newcomment.save();
        res.status(200).json({messsge:"Comment is added",newcomment});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server Error"});
       }
    }

exports.addReplies=async(req,res)=>{
    const commentId=req.params.comment_id;
    const {user_id,text}=req.body;
    console.log(req.body)
    try{
        const comment=await Comment.findById(commentId)
        const user=await User.findById(user_id);
        console.log(comment,user)
        if(!comment ||!user){
            res.status(404).json({message:"NOT FOUND"});
        }
        const replie={
            text,
            user:user_id
        }
        comment.replies.push(replie)
        await comment.save();
        res.status(200).json({messsge:"Replies is added",replie});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server Error"});
       }
}


exports.upadateComment=async(req,res)=>{
    const commentId=req.params.comment_id;
    const {user_id,text}=req.body;
    try{
       const user=await User.findById(user_id);
       const comment=await Comment.findById(commentId);
       if(!comment ||!user){
        res.status(404).json({message:"NOT FOUND"});
      }
      const comment_user=comment.user;
      if(user_id!=comment_user){
        res.status(500).json({message:"You can't update comment that You don't own!"}); 
      }
      comment.text=text;
      await comment.save();
      res.status(200).json({message:"Comment is updated successfully"}); 
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server Error"});
       }
}

exports.updateRepiles=async(req,res)=>{
    const commentId=req.params.comment_id;
    const {user_id,text}=req.body;
    try{
        const user=await User.findById(user_id);
        const comment=await Comment.findById(commentId);
        
        const replyIndex=comment.replies.findIndex((reply)=>reply._id.toString()===replyId)
        if(replyIndex===-1){
            throw new CustomError("Reply not found!",404)
        }

        if(comment.replies[replyIndex].user.toString()!==user_id){
            throw new CustomError("You can only update your comments",404)
        }

        comment.replies[replyIndex].text=text

        await comment.save()
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server Error"});
       }
}


exports.deleteComment=async(req,res)=>{
    const commentId=req.params.comment_id;
    const userId=req.body.user_id;
    const user=await User.findById(userId);
       const comment=await Comment.findById(commentId);
       if(!comment ||!user){
        res.status(404).json({message:"NOT FOUND"});
      }
      const comment_user=comment.user;
      if(user_id!=comment_user){
        res.status(500).json({message:"You can't update comment that You don't own!"}); 
      }
     await comment.deleteOne();
     res.status(200).json({message:"Comment deleted successfully!"});
}

