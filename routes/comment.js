const express=require('express');
const router=express.Router();
const commentcontroller=require('../controller/commentcontroller.js');
const isLogin=require('../middleware/isLogin.js');

//router post request for add commit 
router.post('/addComment/:post_id',isLogin,commentcontroller.addcomment);

//router post request add replies
router.post('/addReplies/:comment_id',isLogin,commentcontroller.addReplies);

//router update comment request 
router.put('/updateComment/:comment_id',isLogin,commentcontroller.upadateComment);

//router delete replies of comment
router.delete('/deleteComment/:comment_id',isLogin,commentcontroller.deleteComment);

// //router get all the comment of post
// router.get('/allComment/:post_id',isLogin,getAllComment);

module.exports=router;