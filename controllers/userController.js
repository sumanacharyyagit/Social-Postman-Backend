// Functions and logics for actions taken on user side
const User = require('../models/user');
const Facebook = require("../models/facebook");
const Instagram = require("../models/instagram");

const getAllUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
        res.json({ success: false, msg: 'Failed to get users' });
        } else {
        res.json({ success: true, users: users });
        }
    });
};

const registerFacebook = (req, res) => {
    Facebook.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
        res.json({ success: false, msg: 'Failed to register user' });
        }
        if (user) {
            res.json({ success: false, msg: 'User already exists' });
        }
        else {
            new Facebook({
                uid: req.user.id,
                username: req.body.username,
                password: req.body.password,
                updated_at: Date.now()
            }).save((err, user) => {
                if (err) {
                    res.json({ success: false, msg: 'Failed to register user' });
                } else {
                    res.json({ success: true, msg: 'Facebook details saved' });
                }
            });
        }
    });
}

const registerInstagram = (req, res) => {
    Instagram.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
        res.json({ success: false, msg: 'Failed to register user' });
        }
        if (user) {
            res.json({ success: false, msg: 'User already exists' });
        }
        else {
            new Instagram({
                uid: req.user.id,
                username: req.body.username,
                password: req.body.password,
                updated_at: Date.now()
            }).save((err, user) => {
                if (err) {
                    res.json({ success: false, msg: 'Failed to register user' });
                } else {
                    res.json({ success: true, msg: 'Instagram details saved' });
                }
            });
        }
    });
}


module.exports = {
    getAllUsers,
    registerFacebook,
    registerInstagram
}