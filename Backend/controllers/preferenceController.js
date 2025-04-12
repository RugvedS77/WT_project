// Backend/controllers/preferenceController.js
const Preference = require('../models/Preference');

exports.getUserPreferences = async (req, res) => {
    try {
        const userId = req.user._id;
        const preferences = await Preference.findOne({ userId });
        res.json(preferences || { language: 'English', theme: 'Light', notifications: true, autosave: false, dashboardLayout: 'Grid' }); // Default values if not found
    } catch (error) {
        console.error('Error fetching preferences:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateUserPreferences = async (req, res) => {
    try {
        const userId = req.user._id;
        const { language, theme, notifications, autosave, dashboardLayout } = req.body;

        const updatedPreferences = await Preference.findOneAndUpdate(
            { userId },
            { language, theme, notifications, autosave, dashboardLayout },
            { new: true, upsert: true, runValidators: true }
        );
        res.json({ message: 'Preferences updated successfully', preferences: updatedPreferences });
    } catch (error) {
        console.error('Error updating preferences:', error);
        res.status(500).json({ message: 'Failed to update preferences' });
    }
};