const express=require('express');
const router=express.Router();
const authcontroller=require('../controller/authcontroller');

//route for register
router.post('/signup',authcontroller.postSignup);

//route for login
router.post('/login',authcontroller.postLogin);

//route for logout
router.post('/logout',authcontroller.postLogout);

module.exports=router;