const express = require('express');
const { registerUser, loginUser, getUsers, logoutUser,updateUser } = require('../controllers/userController.js');
const { protect, authorize } = require('../middlewares/authMiddleware.js');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', protect, authorize('Admin'), getUsers);
router.post('/logout', protect, logoutUser);
router.post('/update-user',protect, authorize('Admin'),updateUser);

module.exports = router;
