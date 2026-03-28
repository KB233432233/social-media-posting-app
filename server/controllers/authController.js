const User = require('../models/User');
const Post = require('../models/Post');
const Comments = require('../models/Comments');

const register = async (req, res) => {
    let { name, username, password } = req.body;
    const user = await User.findOne({ username });

    if (user) return res.status(422).send('username already taken');

    const user2 = await User.create({ name, username, password });
    return res.status(200).json(user2.signJwt());
}

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !user.checkPassword(password)) {
        return res.status(401).send('invalid username or password');
    }
    return res.json(user.signJwt());
}

const retriveProfileData = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).send('user not found');
    const profileData = user.getData();
    return res.status(201).json(profileData);
}

const updateProfileData = async (req, res) => {
    const { oldUsername, oldPassword, newUsername } = req.body;
    let profileFile = req.file ? req.file.filename : null;
    try {
        const user = await User.findOne({ username: oldUsername });
        if (!user) return res.status(401).send("username not found");
        if (!user.checkPassword(oldPassword)) return res.status(301).send('wrong password');
        if (newUsername) {
            await user.updateOne({ username: newUsername })
            await Post.updateMany({ author: user._id }, { authors_name: newUsername });
            await Comments.updateMany({ userId: user._id }, { name: newUsername });
        };
        if (profileFile) {
            await user.updateOne({ profilePic: profileFile })
            await Post.updateMany({ author: user._id }, { authors_pic: profileFile });
            await Comments.updateMany({ userId: user._id }, { img: profileFile });
        };
        return res.status(200).send("updated seccessfully");
    } catch (error) {
        return res.status(500).json("server error");
    }
}


const updateCover = async (req, res) => {
    try {
        const { id } = req.body
        const coverPic = req.file.filename;
        if (coverPic) await User.updateOne({ _id: id }, { coverPic });
        return res.status(200).send('cover changed');
    } catch (error) {
        return res.status(500).send('server error')
    }
}


const getRandomContacts = async (req, res) => {
    try {
        const { id } = req.params;
        const contacts = await User.find({ _id: { $ne: id } }).limit(3).select('-password');
        return res.status(201).json(contacts);
    } catch (error) {
        res.status(500).send('server error');
    }
}

const follow = async (req, res) => {
    try {
        const { id, id2 } = req.body;
        const user = await User.findOne({ _id: id });
        if (user.friends.includes(id2)) return res.status(301).send('bad request');
        user.friends.push(id2);
        await user.updateOne({ following: user.following + 1 });
        await user.save();
        const user2 = await User.findOne({ _id: id2 });
        await user2.updateOne({ followers: user2.followers + 1 });
        await user2.save();
        return res.status(200).send('followed')
    } catch (error) {
        res.status(500).send(error.message);
    }
}



module.exports = {
    register,
    login,
    retriveProfileData,
    updateProfileData,
    updateCover,
    getRandomContacts,
    follow
}