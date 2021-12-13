const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkedinSchema = new Schema({
    uid: Number,
    username: String,
    password: String,
    updated_at: Date
});

module.exports = mongoose.model('Linkedin', linkedinSchema);