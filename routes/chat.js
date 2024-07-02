const express = require('express');
const router = express.Router();
const chatcontroller = require('../controller/chatcontroller');
const { isLogin } = require('../middleware/isLogin');

// Route to create a chat
router.post('/create', isLogin, chatcontroller.createChat);

// Route to get a chat by ID
router.get('/getChat/:chat_id', isLogin, chatcontroller.getChat);

// Route to delete a chat by ID
router.delete('/delete/:chat_id', isLogin, chatcontroller.deleteChat);

module.exports = router;
