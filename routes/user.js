const express=require('express');
const router=express.Router();
const usercontroller=require('../controller/usercontroller');
const verifyToken=require('../middleware/verify');

//route for get the user
router.get('/:user_id',usercontroller.getuser);

//route for update the user model
router.put('/update/:user_id',usercontroller.updateUserData)

//route to follow the user
router.post('/follow/:user_id',usercontroller.follow);

//route to unfollow the user
router.post('/unfollow/:user_id',usercontroller.postUnfollow);

// route to get the search result
router.get('/search/:query',verifyToken,usercontroller.getSearch);

module.exports=router;