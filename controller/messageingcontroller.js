const mongoose=require('mongoose');
const Comment=require('../model/comment');
const Chat =require('../model/chat');
const Messageing=require('../model/messageing');


exports.createchat=async(req,res)=>{
    const {user1,user2}=req.body;
    try{
      const userOne=await User.findById(user1);
      const userSecond=await User.findById(user2);

      if(!userOne||!userSecond){
        res.status(404).json({message:"user not found"});
      }
      if(userOne===userSecond){
        res.status(500).json({message:"Sender and reciever are not same"});
      }

      const newmessageing=new Messageing({
        people:[user1,user2]
      })
      newmessageing.save();
      res.status(200).json({message:"conntection is stabelish"});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"internal Server Error"});
       }
}

exports.getAllMessage=async(req,res)=>{
    const userId=req.body.user_id;
    try{
        const messages=await Messageing.find({people:{$in:userId}});
        res.status(200).json(messages);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"internal Server Error"});
       }
}


exports.getAllMessageBetweenTwo=async(req,res)=>{
    const {user1,user2}=req.body
    try{
        const messages=await Messageing.find({people:{$all:[user1,user2]}});
        res.status(200).json(messages);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"internal Server Error"});
       }
}


exports.deleteMessage=async(req,res)=>{
    const chatId=req.params.chat_id
    
    try{
        await Messageing.deleteOne({_id:chatId})
        await Chat.deleteMany({conversationId:chatId})

        res.status(200).json({message:"Message is deleted"})
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"internal Server Error"});
       }
}