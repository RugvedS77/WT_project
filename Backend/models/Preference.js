// Backend/models/Preference.js
const mongoose = require('mongoose');
const preferenceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true, // Assuming one set of preferences per user
    },
    language: { type: String, default: 'English' },
    theme: { type: String, default: 'Light' },
    notifications: { type: Boolean, default: true },
    autosave: { type: Boolean, default: false },
    dashboardLayout: { type: String, default: 'Grid' },
}, { timestamps: true });

module.exports = mongoose.model('Preference', preferenceSchema);