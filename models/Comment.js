const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String
    },
    username: {
        type: String
    },
    blogId: {
        type: String
    }
})

module.exports = new mongoose.model("Comment", commentSchema)