const express = require('express');
const router = express.Router();

// Example route: test auth endpoint
router.get('/test', (req, res) => {
  res.json({ message: 'Auth route working' });
});

// TODO: Add signup, login, JWT auth, etc.

module.exports = router;