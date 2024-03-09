const express=require('express');
const router=express.Router();
const authcontroller=require('../controller/authcontroller');

router.get('/signup',authcontroller.getSignup);

router.post('/signup',authcontroller.postSignup);

router.get('/login',authcontroller.getLogin);

router.post('/login',authcontroller.postLogin);

router.get('/logout',authcontroller.getLogout);

router.post('/logout',authcontroller.postLogout);

module.exports=router;