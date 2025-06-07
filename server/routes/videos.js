const express = require('express');
const router = express.Router();

// Example route: get all videos
router.get('/', (req, res) => {
  res.json({ videos: [] }); // replace with DB fetch
});

// TODO: Add upload, get by id, delete, update

module.exports = router;