const mongoose = require('mongoose');

const draftSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    scheduledTime: Date,
    mediaUrls: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Draft', draftSchema);