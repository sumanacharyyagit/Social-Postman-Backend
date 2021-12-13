const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const twitterSchema = new Schema({
    uid: Number,
    api_key: String,
    api_secret: String,
    access_token_key: String,
    access_token_secret: String,
    has_permission: Boolean,
    updated_at: Date
});

module.exports = mongoose.model('Twitter', twitterSchema);