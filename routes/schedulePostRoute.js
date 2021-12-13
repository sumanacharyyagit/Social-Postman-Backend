const express = require('express');
const router = express.Router();
const schedule = require('../controllers/scheduleController');
const facebook = require('../controllers/facebookController');
const instagram = require('../controllers/instagramController');
const auth = require('../controllers/authController');

router.post('/', auth.verifyToken, schedule.schedulePost);
// router.get('/', auth.verifyToken, schedule.scheduleGet);
router.post('/facebook', auth.verifyToken, facebook.post);
router.post('/instagram', auth.verifyToken, instagram.post);

module.exports = router;