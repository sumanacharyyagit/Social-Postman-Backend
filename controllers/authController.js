const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const nodemailer = require('nodemailer');

const sendEmail = (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.GMAIL_EMAIL,
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
            console.log(isMatch);
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), process.env.SECRET_KEY, {
                    expiresIn: '1h'
                });
                req.user = user;
                res.json({
                    token: token
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


var verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    let promise = new Promise((resolve) => {
        jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
            if (err) {
                resolve(false);
            }
            if (result) {
                resolve(result);
            }
        });
    });
    promise.then((result) => {
        if (result) {
            next();
        } else {
            res.json({
                msg: 'Invalid Token'
            });
        }
    }
    );
}


// check user info
const checkUser = (req, res) => {
    const user = (req.user) ? req.user : null;
    res.json({
        user: user
    });
}


module.exports = {
    register,
    login,
    verifyToken,
    checkUser
}