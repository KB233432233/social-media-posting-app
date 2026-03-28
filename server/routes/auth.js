const express = require('express');
const router = express.Router();
const { register, login, retriveProfileData, updateProfileData, updateCover, getRandomContacts, follow } = require('../controllers/authController');


const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: './public/images/profileandcoverpics',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });



router.post('/login', login);

router.post('/register', register);

router.get('/profile/:id', retriveProfileData);

router.post('/profile/update', upload.single('profilePic'), updateProfileData);

router.post('/profile/follow', follow);

router.put('/profile/update', upload.single('coverPic'), updateCover)

router.get('/profile/getContacts/:id', getRandomContacts);



module.exports = router;