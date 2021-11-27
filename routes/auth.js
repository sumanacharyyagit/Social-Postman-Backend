const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const authController = require('../controllers/authController');

route.get('/register', authController.register);
route.post('/register', authController.register);

route.get('/login', authController.login);
route.post('/login', authController.login);

route.get('/logout', authController.logout);

