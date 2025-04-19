const Post = require('../models/Post');
const Draft = require('../models/Draft');
const path = require('path');
const fs = require('fs');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { content, tags, visibility, scheduled, scheduledDate } = req.body;
    const userId = req.user._id;

    // Handle image upload if provided
    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const newPost = new Post({
      userId,
      content,
      imageUrl,
      tags: JSON.parse(tags || '[]'), // Parse tags if provided
      visibility,
      scheduled: scheduled === 'true', // Convert string to boolean
      scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Failed to create post' });
  }
};

// Save post as draft
exports.saveDraft = async (req, res) => {
  try {
    const { content, platform, scheduledTime, mediaUrls } = req.body;
    const userId = req.user._id;

    if (!content || !platform) {
      return res.status(400).json({ message: 'Content and platform are required' });
    }

    const draft = new Draft({
      userId,
      content,
      platform,
      scheduledTime: scheduledTime || null,
      mediaUrls: mediaUrls || []
    });

    await draft.save();
    res.status(201).json({ message: 'Draft saved successfully', draft });
  } catch (error) {
    console.error('Error saving draft:', error);
    res.status(500).json({ message: 'Failed to save draft' });
  }
};

// Get user's drafts
exports.getDrafts = async (req, res) => {
  try {
    const userId = req.user._id;
    const drafts = await Draft.find({ userId }).sort({ createdAt: -1 });
    res.json(drafts);
  } catch (error) {
    console.error('Error fetching drafts:', error);
    res.status(500).json({ message: 'Failed to fetch drafts' });
  }
};
