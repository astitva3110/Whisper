const express=require('express');
const router=express.Router();
const commitcontroller=require('../controller/commentcontroller.js');
const verifyToken=require('../middleware/verify');

//router post request for add commit 
router.post('/addCommit/:post_Id',verifyToken,commitcontroller.addCommit);

//router post request 
// router.post('/a',verifyToken,commitcontroller.)


module.exports=router;