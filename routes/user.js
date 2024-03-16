const express=require('express');
const router=express.Router();
const usercontroller=require('../controller/usercontroller');
const isLogin=require('../middleware/isLogin');

//route for get the user
router.get('/:user_id',isLogin,usercontroller.getuser);

//route for update the user model
router.put('/update/:user_id',isLogin,usercontroller.updateUserData)

//route to follow the user
router.post('/follow/:user_id',isLogin,usercontroller.follow);

//route to unfollow the user
router.post('/unfollow/:user_id',isLogin,usercontroller.postUnfollow);

// route to get the search result
router.get('/search/:query',isLogin,usercontroller.getSearch);

//get a sugestion od anoymous name
router.post('/appNameSuggest',isLogin,usercontroller.getSuggestion);

//app name
router.post('/appName/:user_id',isLogin,usercontroller.postappName);

module.exports=router;