const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const nodemailer = require('nodemailer');

const sendEmail = (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: 'Reset Password',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/SomeRandomToken' + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        console.log('Email sent: ' + info.response);
    });
};


const register = (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword
    });
    sendEmail(req, res);
    newUser.save((err, user) => {
        if (err) throw err;
        res.json({
            success: true,
            msg: 'User registered'
        });
    });
}

const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({
        username: username
    }, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                msg: 'User not found'
            });
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), process.env.SECRET_KEY, {
                    expiresIn: 604800
                });
                res.json({
                    success: true,
                    token: token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({
                    success: false,
                    msg: 'Wrong password'
                });
            }
        });
    });
}

const logout = (req, res) => {
    const token = req.body.token;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    msg: 'Failed to logout'
                });
            } else {
                return res.json({
                    success: true,
                    msg: 'Logged out'
                });
            }
        });
    }
}

module.exports = {
    register,
    login,
    logout
}