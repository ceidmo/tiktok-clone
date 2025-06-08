// server/routes/analytics.js
const express = require('express');
const router = express.Router();
const AnalyticsEvent = require('../models/AnalyticsEvent');

// GET /api/analytics?name=Page%20Viewed&userId=xyz&from=2024-01-01&to=2025-01-01
router.get('/', async (req, res) => {
  const { name, userId, from, to } = req.query;
  const filter = {};

  if (name) filter.name = name;
  if (userId) filter.userId = userId;
  if (from || to) {
    filter.timestamp = {};
    if (from) filter.timestamp.$gte = new Date(from);
    if (to) filter.timestamp.$lte = new Date(to);
  }

  try {
    const events = await AnalyticsEvent.find(filter).sort({ timestamp: -1 }).limit(500);
    res.json(events);
  } catch (err) {
    console.error('Error fetching analytics:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;