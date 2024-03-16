const express=require('express');
const router=express.Router();
const postcontroller=require('../controller/postcontroller.js');
const verifyToken=require('../middleware/isLogin.js');

//route for create post
router.post("/post/:user_id",verifyToken,postcontroller.postPOST);

//route for get all the post
router.get("/AllPost/:user_id",verifyToken,postcontroller.getAllPost);


module.exports=router;