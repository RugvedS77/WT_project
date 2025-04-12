const Post = require('../models/Post');
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
