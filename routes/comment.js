const express = require('express');
const router = express.Router();
const commentcontroller = require('../controller/commentcontroller.js');
const { isLogin } = require('../middleware/isLogin.js');

// Route to add a comment to a post
router.post('/addComment/:post_id', isLogin, commentcontroller.addcomment);

// Route to add replies to a comment
router.post('/addReplies/:comment_id', isLogin, commentcontroller.addReplies);

// Route to update a comment
router.put('/updateComment/:comment_id', isLogin, commentcontroller.upadateComment);

// Route to delete a comment
router.delete('/deleteComment/:comment_id', isLogin, commentcontroller.deleteComment);

// Route to like a comment
router.post('/likeComment/:comment_id', isLogin, commentcontroller.likeComment);

// Route to unlike a comment
router.post('/unlikeComment/:comment_id', isLogin, commentcontroller.unlikeComment);

// Route to get all comments of a post
router.get('/allComment/:post_id', isLogin, commentcontroller.getAllComment);

module.exports = router;
