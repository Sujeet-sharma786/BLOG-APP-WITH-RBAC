const express = require('express');
const { protect,authorize } = require('../middlewares/authMiddleware');
const router = express.Router();
const {viewBlogs,postBlogs,getAllBlogs} = require('../controllers/blogController')
const multer = require('multer');
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'uploads/')
    },
    filename: function (req,file,cb){
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null,uniqueName);
    }
});

const upload = multer({storage})




router.get('/view-blogs',protect,authorize('Admin','Moderator','User'),viewBlogs);
router.post('/post-blogs',protect,upload.single('image'),authorize('Admin','Moderator'),postBlogs);
router.get('/get-all-blogs',protect,authorize('Admin','Moderator','User'),getAllBlogs)

module.exports = router;