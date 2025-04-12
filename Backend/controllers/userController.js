// Backend/controllers/userController.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Ensure the uploads directory exists
const ensureUploadsDirectory = () => {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }
};

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        ensureUploadsDirectory(); // Ensure the directory exists
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${req.user._id}-${Date.now()}${path.extname(file.originalname)}`);
    },
});
const upload = multer({ storage });

exports.getUserData = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming req.user is populated by verifyToken
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateUserData = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming req.user is populated by verifyToken
        const { name, phone, timezone, photoPreview } = req.body; // Assuming frontend sends data directly

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, phone, timezone, photoUrl: photoPreview },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user data:', error);
        res.status(500).json({ message: 'Failed to update profile' });
    }
};

exports.uploadPhoto = [
    upload.single('photo'),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            const userId = req.user._id;
            const photoUrl = `/uploads/${req.file.filename}`;

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { photoUrl },
                { new: true }
            ).select('-password');

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json({ message: 'Profile photo updated successfully', user: updatedUser });
        } catch (error) {
            console.error('Error uploading profile photo:', error);
            res.status(500).json({ message: 'Failed to upload profile photo' });
        }
    },
];

// Fetch current password (hashed)
exports.getCurrentPassword = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ currentPasswordHash: user.password });
    } catch (error) {
        console.error('Error fetching current password:', error);
        res.status(500).json({ message: 'Failed to fetch current password' });
    }
};

// Change password
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the password
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Failed to change password' });
    }
};

exports.getPreferences = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.preferences || { theme: 'light', notifications: true, language: 'en' });
    } catch (error) {
        console.error('Error fetching preferences:', error);
        res.status(500).json({ message: 'Failed to fetch preferences' });
    }
};

exports.updatePreferences = async (req, res) => {
    try {
        const { theme, notifications, language } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { preferences: { theme, notifications, language } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Preferences updated successfully', preferences: user.preferences });
    } catch (error) {
        console.error('Error updating preferences:', error);
        res.status(500).json({ message: 'Failed to update preferences' });
    }
};