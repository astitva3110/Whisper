const express=require('express');
const router=express.Router();
const postcontroller=require('../controller/postcontroller.js');
const isLogin=require('../middleware/isLogin.js');

//route for create post
router.post("/post/:user_id",isLogin,postcontroller.postPOST);

//route for get all the post
router.get("/AllPost/:user_id",isLogin,postcontroller.getAllPost);

// router for like the post 
router.post('/likePost/:post_id',isLogin,postcontroller.likePost);

//router to unlike the post 
router.post('/unlikePost/:post_id',isLogin,postcontroller.unlikePost);


module.exports=router;