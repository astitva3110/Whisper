const express=require('express');
const router=express.Router();
const chatcontroller=require('../controller/chatcontroller');
const isLogin=require('../middleware/isLogin');


// route request for create a chat
router.post('/create',isLogin,chatcontroller.createChat);


//route request to get the chat
router.get('/getChat/:chat_id',isLogin,chatcontroller.getChat);


//route request to delete the chat 
router.delete('delete/:chat_id',isLogin,chatcontroller.deleteChat);


module.exports=router;