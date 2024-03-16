const mongoose=require('mongoose');

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

     }]    
})


const Comment=mongoose.model('commentSchema',Comment);

module.exports=Comment;