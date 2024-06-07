const mongoose=require('mongoose');

const messageSchema=new mongoose.Schema({
    people:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }]
},{timestamps:true})

const Messageing=mongoose.model('Messageing',messageSchema);

module.exports=Messageing;