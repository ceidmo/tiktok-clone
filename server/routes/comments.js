const express = require('express');
const router = express.Router();

// Example: get comments for a video
router.get('/:videoId', (req, res) => {
  const videoId = req.params.videoId;
  res.json({ videoId, comments: [] }); // replace with DB fetch
});

// TODO: add add comment, delete comment

module.exports = router;