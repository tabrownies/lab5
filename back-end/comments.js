const express = require("express");
const mongoose = require('mongoose');
const argon2 = require("argon2");

const router = express.Router();
const users = require("./users.js");
const User = users.model;
const validUser = users.valid;
const photos = require("./photos.js");
const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    photo: {
        type: mongoose.Schema.ObjectId,
        ref: 'Photo',
    },
    text: String,
    created: {
        type: Date,
        default: Date.now
    }
});
const Comment = mongoose.model("Comment", commentSchema);
router.post('/', validUser, async (req, res) => {
    const comment = new Comment({
        user: req.user,
        photo: req.body.photo,
        text: req.body.text,
    });
    try {
        await comment.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});
router.get('/:id', async (req, res) => {
    try {
        let comments = await Comment.find({
            photo: req.params.id
        }).sort({
            created: -1
        }).populate('user').populate('photo');
        return res.send(comments);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
})
module.exports = {
    model: Comment,
    routes: router,
}