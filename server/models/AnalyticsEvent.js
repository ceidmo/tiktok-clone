const mongoose = require('mongoose');

const AnalyticsEventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  properties: {
    type: Object,
    default: {},
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('AnalyticsEvent', AnalyticsEventSchema);