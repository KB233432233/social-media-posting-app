const Post = require('../models/Post');
const User = require('../models/User');
const Comments = require('../models/Comments');


const makeAPost = async (req, res) => {
    try {
        const { author, text } = req.body;
        let file;
        if (req.file) file = req.file.filename;
        let user = await User.findById(author);
        const post = await Post.create({ author, authors_name: user.username, authors_pic: user.profilePic, content: [text, file] });
        await post.save();
        return res.status(200).send('post created');
    } catch (error) {
        res.status(500).send('server error')
    }
}


const retrivePosts = async (req, res) => {
    try {
        const { id, skip } = req.params;
        let posts;
        if (id == 'home') posts = (await Post.find().sort({ date: -1 }).skip(skip).limit(20));
        else posts = (await Post.find({ author: id }).sort({ date: -1 }).skip(skip).limit(20));
        if (!posts) return res.status(404).send('not found');
        return res.status(200).json(posts);
    } catch (error) {
        res.status(500).send('server error')
    }
}

const retriveComments = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) return res.status(404).send('not found');
        const comments = await Comments.find({ postId: id });
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).send(error)
    }
}

const makeAComment = async (req, res) => {
    try {
        const { comment, id, postID } = req.body;
        const post = await Post.findById(postID);
        if (!post) return res.status(404).send('not found');
        const user = await User.findById(id);
        const comment2 = {
            name: user.name,
            content: comment,
            img: user.profilePic,
            userId: id,
            postId: postID,
        }
        await Comments.create(comment2);
        return res.status(200).json("successfully created");
    } catch (error) {
        return res.status(500).send('server error');
    }
}

const likeAPost = async (req, res) => {
    try {
        const { postID } = req.body;
        const post = await Post.findById(postID);
        if (!post) return res.status(404).json('not found');
        const likes = Number(post.likes) + 1;
        await Post.updateOne({ _id: postID }, { likes });
        return res.status(200).json(likes);
    } catch (error) {
        res.status(500).send('server error')
    }
}


const deleteAPost = async (req, res) => {
    const { id } = req.params;
    try {
        await Post.deleteOne({ _id: id });
    } catch (error) {
        return res.status(401).json(error)
    }
    return res.status(200).send('post deleted');
}


const deleteAComment = async (req, res) => {
    try {
        const { id } = req.params;
        await Comments.deleteOne({ _id: id });
        return res.status(200).send('deleted');
    } catch (error) {
        return res.status(500).send("server error");
    }
}


module.exports = {
    makeAPost,
    retrivePosts,
    retriveComments,
    makeAComment,
    likeAPost,
    deleteAPost,
    deleteAComment,
}