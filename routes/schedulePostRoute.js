const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

router.post('/', scheduleController.schedulePost);
router.get('/', scheduleController.scheduleGet);