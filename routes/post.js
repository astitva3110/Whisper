const express = require('express');
const router = express.Router();
const postcontroller = require('../controller/postcontroller.js');
const { isLogin } = require('../middleware/isLogin.js');

// Route for creating a post
router.post("/post", isLogin, postcontroller.postPOST);

// Route for getting all posts
router.get("/AllPost", isLogin, postcontroller.getAllPost);

// Route for liking a post
router.post('/likePost/:post_id', isLogin, postcontroller.likePost);

// Route for unliking a post
router.post('/unlikePost/:post_id', isLogin, postcontroller.unlikePost);

module.exports = router;
