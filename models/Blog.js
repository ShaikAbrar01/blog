const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    postedAt: {
        type: String,
        default: new Date().toLocaleDateString('en-us', { weekday:"long", month:"long", day:"numeric", year:"numeric"})
    },
    userId: {
        type: String
    },
    username: {
        type: String
    },
    image: {
        type: String
    }
})

module.exports = new mongoose.model("Blog",BlogSchema)