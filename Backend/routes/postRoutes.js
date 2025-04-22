const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const verifyToken = require('../middleware/verifyToken');
const postController = require('../controllers/postController');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Use path.resolve to get an absolute path
    const uploadPath = path.resolve(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Post routes
router.post('/', verifyToken, upload.single('image'), postController.createPost);
router.get('/', verifyToken, postController.getPostsByStatus);
router.put('/:id', verifyToken, upload.single('image'), postController.updatePost);
router.delete('/:id', verifyToken, postController.deletePost);

module.exports = router;