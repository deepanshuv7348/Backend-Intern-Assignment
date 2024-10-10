const express = require('express');
const { registerUser, loginUser, uploadAssignment, getAllAdmins } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/upload', auth('user'), uploadAssignment);
router.get('/admins', auth('user'), getAllAdmins);

module.exports = router;
