const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
const fileupload = require('express-fileupload');
const bcrypt = require('bcrypt');
const User = require('../model/user');
const { genratetoken } = require('../middleware/isLogin');
const connectdb = require('../util/database');
require('dotenv').config();

// Connect to the database
connectdb();

// Middleware for file upload
router.use(fileupload({
    useTempFiles: true
}));

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

// POST request for login
exports.postLogin = async (req, res) => {
    try {
        // Fetching user data
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare password
        const confirmPassword = await bcrypt.compare(req.body.password, user.password);
        if (!confirmPassword) {
            return res.status(400).json({ message: 'Password is incorrect' });
        }

        // Creating JWT token
        const payload = {
            id: user._id,
            email: user.email
        };
        const token = genratetoken(payload);

        res.status(200).json({ message: 'User is logged in', token: token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// POST request for logout
exports.postLogout = async (req, res) => {
    try {
        res.clearCookie('token', { sameSite: "none", secure: true }).status(200).json({ message: 'User is logged out' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// POST request for Signup
exports.postSignup = async (req, res) => {
    try {
        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Creating new user
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// POST request to upload profile photo
exports.profilePhoto = async (req, res) => {
    const userId = req.user.id;
    const imageFile = req.files.image;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Uploading image to Cloudinary
        const imageResult = await cloudinary.uploader.upload(imageFile.tempFilePath);
        user.profile_picture = imageResult.secure_url;

        await user.save();
        res.status(200).json({ message: 'Profile picture is updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = router;
