const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); // Import the path module
const fs = require('fs'); // Import the fs module
const postController = require('../controllers/postController'); // Fix auth middleware import
const verifyToken = require('../middleware/verifyToken');
const auth = require('../middleware/auth'); // Import auth middleware

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Create a new post
router.post('/create', verifyToken, upload.single('image'), postController.createPost);

// Draft routes
router.post('/saveDraft', auth, postController.saveDraft);
router.get('/drafts', auth, postController.getDrafts);

module.exports = router;
