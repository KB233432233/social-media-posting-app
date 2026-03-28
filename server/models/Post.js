const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    authors_name: {
        type: String,
        ref: 'User',
        required: true
    },
    authors_pic: {
        type: String,
        ref: 'User',
    },
    content: {
        type: Array,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});



const Post = mongoose.model('Post', PostSchema);

module.exports = Post;