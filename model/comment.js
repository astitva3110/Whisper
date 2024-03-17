const mongoose=require('mongoose');
const User = require('./user'); 

const commentSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required:true
    },
    text:{
       type:String,
       required:true
    },
     replies:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'user'
        },
        text:{
            type:String,
            required:true
         },

     }],
     likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],    
})


const Comment=mongoose.model('Comment',commentSchema);

module.exports=Comment;