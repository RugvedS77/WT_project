// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  imageUrl: { type: String }, // Field to store the image URL
  tags: { type: [String], default: [] }, // Array of tags
  visibility: { type: String, enum: ['Public', 'Private', 'Friends'], default: 'Public' }, // Post visibility
  scheduled: { type: Boolean, default: false },
  scheduledDate: { type: Date }, // Date for scheduled posts
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);