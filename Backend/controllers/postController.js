const Post = require('../models/Post');
const path = require('path');
const fs = require('fs');

exports.createPost = async (req, res) => {
  try {
    const { content, tags, visibility, status = 'draft', scheduledDate } = req.body;
    const userId = req.user._id;

    // Validate status
    if (!['draft', 'scheduled', 'published'].includes(status)) {
      return res.status(400).json({ error: 'Invalid post status' });
    }

    // Validate scheduled posts
    if (status === 'scheduled' && (!scheduledDate || new Date(scheduledDate) < new Date())) {
      return res.status(400).json({ error: 'Valid scheduled date required' });
    }

    const newPost = new Post({
      userId,
      content,
      tags: JSON.parse(tags || '[]'),
      visibility: visibility || 'Public',
      status,
      scheduledDate: status === 'scheduled' ? new Date(scheduledDate) : null,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null
    });

    await newPost.save();
    
    res.status(201).json({
      message: status === 'draft' ? 'Draft saved' : 
              status === 'scheduled' ? 'Post scheduled' : 'Post published',
      post: newPost
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

exports.getPostsByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const userId = req.user._id;

    const query = { userId };
    if (status && ['draft', 'scheduled', 'published'].includes(status)) {
      query.status = status;
    }

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .lean();

    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user._id;
    
    const post = await Post.findOne({ _id: id, userId });
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Handle image update
    if (req.file) {
      // Delete old image if exists
      if (post.imageUrl) {
        const oldImagePath = path.join(__dirname, `../../${post.imageUrl}`);
        fs.unlink(oldImagePath, err => {
          if (err) console.error('Error deleting old image:', err);
        });
      }
      updates.imageUrl = `/uploads/${req.file.filename}`;
    }

    // Validate status transitions
    if (updates.status) {
      if (post.status === 'published' && updates.status !== 'published') {
        return res.status(400).json({ error: 'Published posts cannot be modified' });
      }
      
      if (updates.status === 'scheduled' && !updates.scheduledDate) {
        return res.status(400).json({ error: 'Scheduled date required' });
      }
    }

    // Update post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const post = await Post.findOneAndDelete({ _id: id, userId });
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Delete associated image
    if (post.imageUrl) {
      const imagePath = path.join(__dirname, `../../${post.imageUrl}`);
      fs.unlink(imagePath, err => {
        if (err) console.error('Error deleting image:', err);
      });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

// Scheduled posts automation (add to server.js)
exports.checkScheduledPosts = async () => {
  try {
    const now = new Date();
    const posts = await Post.find({
      status: 'scheduled',
      scheduledDate: { $lte: now }
    });

    for (const post of posts) {
      post.status = 'published';
      post.scheduledDate = null;
      await post.save();
      console.log(`Auto-published post ${post._id}`);
    }
  } catch (error) {
    console.error('Error in scheduled post check:', error);
  }
};