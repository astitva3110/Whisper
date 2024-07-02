const mongoose = require('mongoose');
const User = require('../model/user');
const Post = require('../model/Post');
const Comment = require('../model/comment');

// Add a comment to a post
exports.addComment = async (req, res) => {
    const postId = req.params.post_id;
    const userId = req.user;
    const { text } = req.body;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const newComment = new Comment({
            user: userId.id,
            text,
            post: postId
        });

        await newComment.save();
        res.status(200).json({ message: "Comment added", newComment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Add a reply to a comment
exports.addReplies = async (req, res) => {
    const commentId = req.params.comment_id;
    const userId = req.user;
    const { text } = req.body;

    try {
        const comment = await Comment.findById(commentId);
        const user = await User.findById(userId.id);
        if (!comment || !user) {
            return res.status(404).json({ message: "Comment or user not found" });
        }

        const reply = {
            text,
            user: userId.id
        };

        comment.replies.push(reply);
        await comment.save();
        res.status(200).json({ message: "Reply added", reply });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update a comment
exports.updateComment = async (req, res) => {
    const commentId = req.params.comment_id;
    const userId = req.user;
    const { text } = req.body;

    try {
        const user = await User.findById(userId.id);
        const comment = await Comment.findById(commentId);
        if (!comment || !user) {
            return res.status(404).json({ message: "Comment or user not found" });
        }

        if (userId.id !== comment.user.toString()) {
            return res.status(403).json({ message: "You can't update comments you don't own" });
        }

        comment.text = text;
        await comment.save();
        res.status(200).json({ message: "Comment updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update a reply to a comment
exports.updateReplies = async (req, res) => {
    const commentId = req.params.comment_id;
    const userId = req.user;
    const { text } = req.body;
    const replyId = req.body.reply_id; // Assuming reply_id is passed in the body

    try {
        const user = await User.findById(userId.id);
        const comment = await Comment.findById(commentId);
        if (!comment || !user) {
            return res.status(404).json({ message: "Comment or user not found" });
        }

        const replyIndex = comment.replies.findIndex(reply => reply._id.toString() === replyId);
        if (replyIndex === -1) {
            return res.status(404).json({ message: "Reply not found" });
        }

        if (comment.replies[replyIndex].user.toString() !== userId.id) {
            return res.status(403).json({ message: "You can only update your replies" });
        }

        comment.replies[replyIndex].text = text;
        await comment.save();
        res.status(200).json({ message: "Reply updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
    const commentId = req.params.comment_id;
    const userId = req.user;

    try {
        const user = await User.findById(userId.id);
        const comment = await Comment.findById(commentId);
        if (!comment || !user) {
            return res.status(404).json({ message: "Comment or user not found" });
        }

        if (userId.id !== comment.user.toString()) {
            return res.status(403).json({ message: "You can't delete comments you don't own" });
        }

        await comment.deleteOne();
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Like a comment
exports.likeComment = async (req, res) => {
    const userId = req.user; 
    const commentId = req.params.comment_id;

    try {
        const user = await User.findById(userId.id);
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.likes.includes(user._id)) {
            return res.status(400).json({ message: "Comment already liked" });
        }

        comment.likes.push(user._id);
        await comment.save();
        res.status(200).json({ message: "Comment liked" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Unlike a comment
exports.unlikeComment = async (req, res) => {
    const userId = req.user; 
    const commentId = req.params.comment_id;

    try {
        const user = await User.findById(userId.id);
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (!comment.likes.includes(user._id)) {
            return res.status(400).json({ message: "Comment not liked yet" });
        }

        comment.likes.pull(user._id);
        await comment.save();
        res.status(200).json({ message: "Comment unliked" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get all comments for a post
exports.getAllComments = async (req, res) => {
    const postId = req.params.post_id;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const comments = await Comment.find({ post: postId });
        res.status(200).json({ message: "Comments found", comments });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
