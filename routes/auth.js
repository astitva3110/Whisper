const express=require('express');
const router=express.Router();
const authcontroller=require('../controller/authcontroller');

//route for register
router.post('/signup',authcontroller.postSignup);

//route to uplaod profile photo
router.post('/profilePhoto/:user_id',authcontroller.profilePhoto)

//route for login
router.post('/login',authcontroller.postLogin);

//route for logout
router.post('/logout',authcontroller.postLogout);

module.exports=router;