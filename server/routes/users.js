const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Video = require('../models/Video');
const Notification = require('../models/Notification');

// Get user profile
router.get('/:username', auth, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select('-password -notifications')
      .populate('followers following', 'username avatar');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const videos = await Video.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .populate('userId', 'username avatar');

    const isFollowing = req.user.following.includes(user._id);

    res.json({ user, videos, isFollowing });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Follow/unfollow user
router.post('/:userId/follow', auth, async (req, res) => {
  try {
    if (req.user.id === req.params.userId) {
      return res.status(400).json({ msg: 'You cannot follow yourself' });
    }

    const userToFollow = await User.findById(req.params.userId);
    const currentUser = await User.findById(req.user.id);

    if (!userToFollow) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const isFollowing = currentUser.following.includes(req.params.userId);

    if (isFollowing) {
      // Unfollow
      currentUser.following.pull(req.params.userId);
      userToFollow.followers.pull(req.user.id);
    } else {
      // Follow
      currentUser.following.push(req.params.userId);
      userToFollow.followers.push(req.user.id);

      // Create notification
      const notification = new Notification({
        recipient: userToFollow._id,
        type: 'follow',
        sender: currentUser._id,
        read: false
      });

      await notification.save();
    }

    await currentUser.save();
    await userToFollow.save();

    res.json({ isFollowing: !isFollowing });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get user notifications
router.get('/notifications/all', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.id })
      .sort({ createdAt: -1 })
      .populate('sender', 'username avatar')
      .populate('video', 'thumbnail');

    // Mark as read
    await Notification.updateMany(
      { recipient: req.user.id, read: false },
      { $set: { read: true } }
    );

    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get unread notification count
router.get('/notifications/count', auth, async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      recipient: req.user.id,
      read: false
    });
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
