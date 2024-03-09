const express=require('express');
const router=express.Router();
const postcontroller=require('../controller/postcontroller.js');

router.post("/post/:user_id",postcontroller.postPOST);

router.get("/AllPost/:user_id",postcontroller.getAllPost);


module.exports=router;