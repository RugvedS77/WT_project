const express = require('express');
const router = express.Router();
const Draft = require('../models/Draft');

// Get all drafts for a user
router.get('/:userId', async (req, res) => {
    try {
        if (!req.params.userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const drafts = await Draft.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(drafts);
    } catch (error) {
        console.error('Error fetching drafts:', error);
        res.status(500).json({ message: 'Error fetching drafts', error: error.message });
    }
});

// Save new draft
router.post('/', async (req, res) => {
    try {
        const { userId, content, platform } = req.body;
        
        if (!userId || !content || !platform) {
            return res.status(400).json({ 
                message: 'Missing required fields',
                required: ['userId', 'content', 'platform']
            });
        }

        const draft = new Draft({
            userId,
            content,
            platform,
            scheduledTime: req.body.scheduledTime || null,
            mediaUrls: req.body.mediaUrls || []
        });

        const newDraft = await draft.save();
        res.status(201).json(newDraft);
    } catch (error) {
        console.error('Error saving draft:', error);
        res.status(500).json({ message: 'Error saving draft', error: error.message });
    }
});

// Update draft
router.patch('/:id', async (req, res) => {
    try {
        const draft = await Draft.findById(req.params.id);
        if (!draft) return res.status(404).json({ message: 'Draft not found' });

        Object.assign(draft, req.body, { lastModified: Date.now() });
        const updatedDraft = await draft.save();
        res.json(updatedDraft);
    } catch (error) {
        console.error('Error updating draft:', error);
        res.status(500).json({ message: 'Error updating draft', error: error.message });
    }
});

// Delete draft
router.delete('/:id', async (req, res) => {
    try {
        const draft = await Draft.findById(req.params.id);
        if (!draft) return res.status(404).json({ message: 'Draft not found' });

        await draft.remove();
        res.json({ message: 'Draft deleted' });
    } catch (error) {
        console.error('Error deleting draft:', error);
        res.status(500).json({ message: 'Error deleting draft', error: error.message });
    }
});

module.exports = router;