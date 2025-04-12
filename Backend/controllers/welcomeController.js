// controllers/welcomeController.js
const User = require('../models/User');
const Post = require('../models/Post');

exports.getWelcomeData = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).select('username');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const username = user.username;

        const scheduledPostsCount = await Post.countDocuments({ userId, scheduled: true });

        res.setHeader('Content-Type', 'application/json');
        res.json({ userName: username, scheduledPosts: scheduledPostsCount });
    } catch (error) {
        console.error('Error fetching welcome data:', error);
        res.status(500).json({ message: 'Server error' });
    }
};