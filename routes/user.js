const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { isLogin } = require('../middleware/isLogin');

// Route to get the user
router.get('/', isLogin, userController.getUser);

// Route to update the user model
router.put('/update', isLogin, userController.updateUserData);

// Route to follow the user
router.post('/follow', isLogin, userController.follow);

// Route to unfollow the user
router.post('/unfollow', isLogin, userController.postUnfollow);

// Route to get the search result
router.get('/search/:query', isLogin, userController.getSearch);

// Route to get a suggestion of an anonymous name
router.post('/appNameSuggest', isLogin, userController.getSuggestion);

// Route to set the app name
router.post('/appName', isLogin, userController.postAppName);

module.exports = router;
