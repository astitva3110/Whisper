const express = require('express');
const User = require('../model/user');
const Post = require('../model/Post');
const connectdb = require('../util/database');
require('dotenv').config();
connectdb();

// Create a post for a user
exports.postPOST = async (req, res) => {
    const { text } = req.body;
    const user_id = req.user; 
    try {
        // Fetch the user info
        const user = await User.findById(user_id.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Create the post
        const newPost = new Post({
            name: user_id.id,
            text
        });

        // Save the post
        await newPost.save();
        user.post.push(newPost._id);
        await user.save();
        res.status(200).json(newPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get all the posts of users followed by the current user
exports.getAllPost = async (req, res) => {
    const userId = req.user;
    try {
        // Fetch the user info
        const user = await User.findById(userId.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch posts from users followed by the current user
        const postsFromUser = await Post.find({ name: { $in: user.following } })
            .sort({ createdAt: -1 })
            .populate('name', 'name');

        if (!postsFromUser) {
            return res.status(404).json({ message: "No posts available" });
        }

        res.status(200).json(postsFromUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Like a post
exports.likePost = async (req, res) => {
    const userId = req.user; 
    const postId = req.params.post_id;
    try {
        // Fetch the user and post info
        const user = await User.findById(userId.id);
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        post.likes.push(user._id);
        await post.save();
        res.status(200).json({ message: "Post liked" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Unlike a post
exports.unlikePost = async (req, res) => {
    const userId = req.user; 
    const postId = req.params.post_id;
    try {
        // Fetch the user and post info
        const user = await User.findById(userId.id);
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (!post.likes.includes(userId.id)) {
            return res.status(500).json({ message: "Post is not liked" });
        }

        post.likes.pull(userId.id);
        await post.save();
        res.status(200).json({ message: "Post unliked" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
