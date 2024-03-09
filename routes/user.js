const express=require('express');
const router=express.Router();
const usercontroller=require('../controller/usercontroller');

router.post('/:user_id',usercontroller.getuser);

router.put('/update/:user_id',usercontroller.updateUserData)

router.post('/follow/:user_id',usercontroller.follow);

router.get('/unfollow/:user_id',usercontroller.getUnfollow);

router.post('/unfollow/:user_id',usercontroller.postUnfollow);


// router.delete('/delete/:user_id',usercontroller.postDelete);

router.get('/search/:query',usercontroller.getSearch);

// router.post('/search/:query',usercontroller.postSearch);

module.exports=router;