// const mongoose = require('mongoose');
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String },
//   name: { type: String },
//   provider: { type: String, enum: ['local', 'google'], default: 'local' },
//   scheduledPosts: { type: Number, default: 0, required: true },
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);


// Backend/models/User.js
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String },
    phone: { type: String },
    timezone: { type: String },
    photoUrl: { type: String }, // Or store path/reference
    provider: { type: String, enum: ['local', 'google'], default: 'local' },
    // ... other user fields
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);