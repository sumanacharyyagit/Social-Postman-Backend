const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schedulerSchema = new Schema({
    uid: Number,
    type: Number,
    post: {
        title: String,
        content: String,
        image: String || null,
        video: String || null,
        content_type: Number
    },
    time: Date,
    status: String
});

module.exports = mongoose.model('Scheduler', schedulerSchema);