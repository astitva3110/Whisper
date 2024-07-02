const mongoose = require('mongoose');
const User = require('../model/user');
const Chat = require('../model/chat');
const Messageing = require('../model/messageing');

// Create a chat between two users
exports.createChat = async (req, res) => {
    const { user1, user2 } = req.body;
    try {
        const userOne = await User.findById(user1);
        const userSecond = await User.findById(user2);

        if (!userOne || !userSecond) {
            return res.status(404).json({ message: "User not found" });
        }
        if (userOne._id.equals(userSecond._id)) {
            return res.status(400).json({ message: "Sender and receiver cannot be the same person" });
        }

        const newMessageing = new Messageing({
            people: [user1, user2]
        });
        await newMessageing.save();
        res.status(201).json({ message: "Connection established", newMessageing });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get all messages for a user
exports.getAllMessages = async (req, res) => {
    const userId = req.user.id;
    try {
        const messages = await Messageing.find({ people: { $in: userId } });
        res.status(200).json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get all messages between two users
exports.getAllMessagesBetweenTwo = async (req, res) => {
    const { user1, user2 } = req.body;
    try {
        const messages = await Messageing.find({ people: { $all: [user1, user2] } });
        res.status(200).json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete a chat and its messages
exports.deleteMessage = async (req, res) => {
    const chatId = req.params.chat_id;

    try {
        await Messageing.deleteOne({ _id: chatId });
        await Chat.deleteMany({ conversationId: chatId });

        res.status(200).json({ message: "Message deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
