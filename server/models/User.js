const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20,
    },
    username: {
        type: String,
        required: true,
        maxlength: 20,
    },
    password: {
        type: String,
        required: true,
        maxlength: 100,
    },
    profilePic: {
        type: String,
    },
    coverPic: {
        type: String,
    },
    bio: {
        type: String,
        maxlength: 100,
    },
    posts: {
        type: Array,
        ref: 'Post',
    },
    friends: {
        type: Array,
        ref: 'User'
    },
    followers: {
        type: Number,
        default: 0
    },
    following: {
        type: Number,
        default: 0
    }
});

UserSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 8);
    }
    next();
});

UserSchema.methods.getData = function () {
    return {
        id: this._id,
        name: this.name,
        username: this.username,
        profilePic: this.profilePic,
        coverPic: this.coverPic,
        bio: this.bio,
        posts: this.posts,
        friends: this.friends,
        followers: this.followers,
        following: this.following,
    }
};

UserSchema.methods.signJwt = function () {
    let data = this.getData();
    data.token = jwt.sign(data, process.env.JWT_SECRET);
    return data;
}

UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}



const User = mongoose.model('User', UserSchema);


module.exports = User