const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instagramSchema = new Schema({
    uid: Number,
    username: String,
    password: String,
    updated_at: Date
});

module.exports = mongoose.model('Instagram', instagramSchema);