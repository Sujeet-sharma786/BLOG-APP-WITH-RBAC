const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

const {bookStore,listBooks} = require('../controllers/bookController');



router.post('/book-store',protect,authorize('Admin','Moderator','User'),bookStore);
router.get('/list-books',protect,authorize('Admin','Moderator','User'),listBooks);








module.exports = router;