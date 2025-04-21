// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  imageUrl: { type: String }, 
  tags: { type: [String], default: [] }, 
  visibility: { type: String, enum: ['Public', 'Private', 'Friends'], default: 'Public' }, 
  scheduledDate: { type: Date }, 
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'published'],
    default: 'draft'
  },
}, { timestamps: true });

postSchema.index({ userId: 1, status: 1 });

module.exports = mongoose.model('Post', postSchema);