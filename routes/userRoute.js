const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../controllers/authController');

router.get('/', auth.verifyToken, userController.getAllUsers);
router.get('/register/instagram', auth.verifyToken, userController.registerInstagram);
router.get('/register/facebook', auth.verifyToken, userController.registerFacebook);

module.exports = router;