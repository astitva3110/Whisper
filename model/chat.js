const mongoose=require('mongoose');

const chatSchema=new mongoose.Schema({
    messageId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'messageing',
        required:true
    },
    text:{
       type:String,
       required:true
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }

})
const Chat=mongoose.model('Chat',chatSchema);

module.exports=Chat;