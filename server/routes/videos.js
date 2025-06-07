const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');

const Video = require('../models/Video');
const User = require('../models/User');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/videos';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB
});

// Upload video
router.post('/', auth, upload.single('video'), async (req, res) => {
  try {
    const { description, song, hashtags } = req.body;
    const userId = req.user.id;
    
    const video = new Video({
      userId,
      url: `/api/videos/file/${req.file.filename}`,
      thumbnail: '/default-thumbnail.jpg', // You'd generate this
      description,
      song,
      hashtags: hashtags ? hashtags.split(',').map(tag => tag.trim()) : []
    });

    await video.save();
    res.json(video);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get all videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find().populate('userId', 'username avatar');
    res.json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Serve video file
router.get('/file/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../../uploads/videos', req.params.filename);
  res.sendFile(filePath);
});

// Like/unlike video
router.post('/:id/like', auth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ msg: 'Video not found' });
    }

    const userId = req.user.id;
    const likeIndex = video.likes.indexOf(userId);

    if (likeIndex === -1) {
      video.likes.push(userId);
    } else {
      video.likes.splice(likeIndex, 1);
    }

    await video.save();
    res.json(video);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
