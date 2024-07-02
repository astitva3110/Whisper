const express = require('express');
const router = express.Router();
const isLogin = require('../middleware/isLogin.js');
const { messagingcontroller } = require('../controller/messagingcontroller.js');

// Route to create a conversation
router.post('/create', isLogin, messagingcontroller.createchat);

// Route to get all messages
router.get('/getMessage', isLogin, messagingcontroller.getAllMessage);

// Route to get the conversation between two users
router.get('/getAll', isLogin, messagingcontroller.getAllMessageBetweenTwo);

// Route to delete a chat
router.delete('/deleteChat', isLogin, messagingcontroller.deleteMessage);

module.exports = router;
