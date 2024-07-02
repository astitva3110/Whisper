const express = require('express');
const User = require('../model/user');
const generateUsername = require('random-username-generator');

// Get user info
exports.getuser = async (req, res) => {
    const userId = req.user;
    try {
        const user = await User.findById(userId.id);
        if (!user) {
            return res.status(404).json({ message: 'User is not found' });
        }
        res.status(200).json({ message: "User is found " });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Update the user data
exports.updateUserData = async (req, res) => {
    const userId = req.user;
    const { update } = req.body;
    try {
        const user = await User.findById(userId.id);
        if (!user) {
            return res.status(404).json({ message: "User is not found" });
        }
        Object.assign(user, update);
        await user.save();
        res.status(200).json({ message: "Data is updated in database" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Follow a user
exports.follow = async (req, res) => {
    const currentUser = req.user;
    const { _id } = req.body;
    try {
        if (currentUser.id === _id) {
            return res.status(500).json({ message: "User can't follow itself" });
        }
        const user = await User.findById(currentUser.id);
        const followUser = await User.findById(_id);
        if (!user || !followUser) {
            return res.status(404).json({ message: "User not found" });
        }
        if (followUser.following.includes(currentUser.id)) {
            return res.status(500).json({ message: "User is already followed" });
        }
        followUser.following.push(currentUser.id);
        user.follower.push(_id);
        await followUser.save();
        await user.save();
        res.status(200).json({ message: "You followed the other user" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Unfollow a user
exports.postUnfollow = async (req, res) => {
    const currentUser = req.user;
    const { _id } = req.body;
    try {
        if (currentUser.id === _id) {
            return res.status(500).json({ message: "User can't follow itself" });
        }
        const unfollow = await User.findById(currentUser.id);
        const user = await User.findById(_id);
        if (!user || !unfollow) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!user.following.includes(currentUser.id)) {
            return res.status(500).json({ message: "User is not present" });
        }
        user.following.pull(currentUser.id);
        unfollow.follower.pull(_id);
        await unfollow.save();
        await user.save();
        res.status(200).json({ message: "User unfollowed the other user" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Search for users
exports.getSearch = async (req, res) => {
    const { query } = req.params;
    try {
        const user = await User.find({ name: { $regex: new RegExp(query, 'i') } });
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Set app name for user
exports.postappName = async (req, res) => { 
    const appname = req.body.appName;
    const userId = req.user;
    try {
        const name = await User.findOne({ appName: appname });
        if (name) {
            return res.status(500).json({ message: "App name is already taken" });
        }
        const user = await User.findById(userId.id);
        user.appName = appname;
        await user.save(); // Save the user
        res.status(200).json({ appname });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get a suggestion for an anonymous app name
exports.getSuggestion = (req, res) => {
    const randomUsername = generateUsername();
    res.status(200).json({ name: randomUsername });
}
