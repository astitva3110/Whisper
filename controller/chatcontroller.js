const mongoose = require('mongoose');
const User = require('../model/user');
const Post = require('../model/Post');
const Comment = require('../model/comment');
const Chat = require('../model/chat');

// Create a new chat message
exports.createChat = async (req, res) => {
    const newChat = new Chat({
        messageId: req.body.messageId,
        text: req.body.text,
        sender: req.user.id
    });

    try {
        await newChat.save();
        res.status(201).json(newChat);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get a specific chat by its ID
exports.getChat = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.chat_id);

        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        res.status(200).json(chat);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete a specific chat by its ID
exports.deleteChat = async (req, res) => {
    try {
        const chat = await Chat.findByIdAndDelete(req.params.chat_id);

        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        res.status(200).json({ message: "Chat deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
