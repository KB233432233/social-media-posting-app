const express = require('express');
const { makeAPost, retrivePosts, retriveComments, makeAComment, likeAPost, deleteAPost, deleteAComment } = require('../controllers/postController');

const router = express.Router();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: './public/images/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });




router.post('/', upload.single('file'), makeAPost);
router.get('/getPosts/:id/:skip', retrivePosts);
router.get('/getPostComments/:id', retriveComments);
router.post('/postAComment', makeAComment);
router.patch("/like", likeAPost);
router.delete('/:id', deleteAPost);
router.delete('/deleteAComment/:id', deleteAComment)


module.exports = router

