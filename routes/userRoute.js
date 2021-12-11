const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../controllers/authController');

router.get('/', auth.verifyToken, userController.getAllUsers);

module.exports = router;