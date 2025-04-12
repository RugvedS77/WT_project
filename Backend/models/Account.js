const mongoose = require('mongoose');

const platformSchema = new mongoose.Schema({
    platform: {
        type: String,
        enum: ['facebook', 'instagram', 'twitter', 'youtube', 'whatsapp', 'linkedin'], // Added LinkedIn
        required: true,
    },
    isConnected: {
        type: Boolean,
        default: false,
    },
    accessToken: {
        type: String,
        default: null,
    },
    profileId: {
        type: String,
        default: null,
    },
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true, // Ensure one document per user
    },
    username: {
        type: String,
        required: true,
    },
    platforms: [platformSchema], // Store platforms as an array
    connectedCount: {
        type: Number,
        default: 0, // Initialize with 0
    },
}, { timestamps: true });

// Add the getAllUserPlatformSummaries method
accountSchema.statics.getAllUserPlatformSummaries = async function () {
    return this.aggregate([
        {
            $project: {
                userId: 1,
                connectedPlatforms: {
                    $filter: {
                        input: '$platforms',
                        as: 'platform',
                        cond: { $eq: ['$$platform.isConnected', true] },
                    },
                },
            },
        },
    ]);
};

module.exports = mongoose.model('Account', accountSchema);
