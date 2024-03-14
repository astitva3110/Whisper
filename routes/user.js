const express=require('express');
const router=express.Router();
const usercontroller=require('../controller/usercontroller');
const verifyToken=require('../middleware/verify');

//route for get the user
router.get('/:user_id',verifyToken,usercontroller.getuser);

//route for update the user model
router.put('/update/:user_id',verifyToken,usercontroller.updateUserData)

//route to follow the user
router.post('/follow/:user_id',verifyToken,usercontroller.follow);

//route to unfollow the user
router.post('/unfollow/:user_id',verifyToken,usercontroller.postUnfollow);

// route to get the search result
router.get('/search/:query',verifyToken,usercontroller.getSearch);

//get a sugestion od anoymous name
router.post('/appNameSuggest',verifyToken,usercontroller.getSuggestion);

//app name
router.post('/appName/:user_id',verifyToken,usercontroller.postappName);

module.exports=router;