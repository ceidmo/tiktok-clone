const mongoose = require('mongoose');

const AnalyticsEventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true, // Index for fast filtering by event name
  },
  properties: {
    type: Object,
    default: {},
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true, // Index for fast filtering by user
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true, // Index for date range queries
  },
});

module.exports = mongoose.model('AnalyticsEvent', AnalyticsEventSchema);
