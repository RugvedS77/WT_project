const mongoose = require('mongoose');

const platformSchema = new mongoose.Schema({
    platform: {
        type: String,
        enum: ['facebook', 'instagram', 'twitter', 'youtube', 'whatsapp', 'linkedin'],
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
    refreshToken: {
        type: String,
        default: null,
    },
    tokenExpires: {
        type: Date,
        default: null,
    },
    profileId: {
        type: String,
        default: null,
    },
    profileData: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },
    // Platform-specific metadata
    scopes: {
        type: [String],
        default: [],
    },
    lastSynced: {
        type: Date,
        default: null,
    }
}, { timestamps: true });

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
        index: true
    },
    username: {
        type: String,
        required: true,
    },
    platforms: [platformSchema],
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for connected platforms count
accountSchema.virtual('connectedCount').get(function() {
    return this.platforms.filter(p => p.isConnected).length;
});

// Virtual for connected platforms list
accountSchema.virtual('connectedPlatforms').get(function() {
    return this.platforms.filter(p => p.isConnected);
});

// Indexes for faster querying
accountSchema.index({ 'platforms.platform': 1 });
accountSchema.index({ 'platforms.isConnected': 1 });
accountSchema.index({ 'platforms.tokenExpires': 1 });

// Helper method to get platform connection status
accountSchema.methods.getPlatform = function(platformName) {
    return this.platforms.find(p => p.platform === platformName) || {
        isConnected: false,
        platform: platformName
    };
};

// Static method to get all connected platforms for a user
accountSchema.statics.findConnectedPlatforms = function(userId) {
    return this.findOne({ userId })
        .select('platforms')
        .then(account => 
            account ? account.platforms.filter(p => p.isConnected) : []
        );
};

// Validation for required fields when connected
platformSchema.pre('save', function(next) {
    if (this.isConnected) {
        if (!this.accessToken || !this.profileId) {
            return next(new Error('Connected platforms require accessToken and profileId'));
        }
    }
    next();
});

module.exports = mongoose.model('Account', accountSchema);