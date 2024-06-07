const express=require('express');
const router=express.Router();
const isLogin=require('../middleware/isLogin.js');
const messageingcontroller=require('../controller/messageingcontroller.js');


//router post request to create a conversation
router.post('/create',isLogin,messageingcontroller.createchat);

//get request to get the message
router.get('/getMessage',isLogin,messageingcontroller.getAllMessage);

//get the converstion between two user
router.get('/getAll',isLogin,messageingcontroller.getAllMessageBetweenTwo);

//delete the chat
router.delete('/deleteChat',isLogin,messageingcontroller.deleteMessage)

module.exports=router;