const mongoose=require('mongoose');
const User=require('../model/user');
const Post=require('../model/Post');
const Comment=require('../model/comment');
const Chat =require('../model/chat');

exports.createChat=async(req,res)=>{
    const newchat=new Chat({
        messageId:req.body.messageId,
        text:req.body.text,
        sender:req.body.user_id
    })
    try{
        await newchat.save()
        res.status(200).json(newchat);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server Error"});
       }
}

exports.getChat=async(req,res)=>{

    try{
        const chats=await Chat.find({
            _id:req.params.chat_id
        })

        res.status(200).json(chats)
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"internal Server Error"});
       }
}

exports.deleteChat=async(req,res,next)=>{

    try{

        await Chat.findByIdAndDelete(req.params.chat_id)
        res.status(200).json({message:"chat is deleted"})
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"internal Server Error"});
       }
}