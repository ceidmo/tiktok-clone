const express = require('express');
const router = express.Router();

// Example: get user profile
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  res.json({ userId, name: "Example User" }); // replace with DB fetch
});

// TODO: update profile, follow/unfollow, etc.

module.exports = router;