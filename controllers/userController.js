// Functions and logics for actions taken on user side
const User = require('../models/user');

const getAllUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
        res.json({ success: false, msg: 'Failed to get users' });
        } else {
        res.json({ success: true, users: users });
        }
    });
};

module.exports = {
    getAllUsers
}