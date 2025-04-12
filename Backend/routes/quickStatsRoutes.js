const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Post = require('../models/Post'); // Import the Post model

router.get('/', verifyToken, async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch counts from the database
        const scheduledPostsCount = await Post.countDocuments({ userId, scheduled: true });
        const publishedPostsCount = await Post.countDocuments({ userId, scheduled: false });
        const avgEngagement = '24%'; // Placeholder for engagement calculation

        const stats = [
            { label: 'Scheduled Posts', value: scheduledPostsCount },
            { label: 'Published Posts', value: publishedPostsCount },
            { label: 'Avg. Engagement', value: avgEngagement },
        ];

        res.json(stats);
    } catch (error) {
        console.error('Error fetching quick stats:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
