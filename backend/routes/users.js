const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
const ConnectionRequest = require('../models/ConnectionRequest');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('connections', 'name');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const posts = await Post.find({ author: req.params.id })
      .populate('author', 'name')
      .sort({ createdAt: -1 });

    res.json({ user, posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, bio, location, company } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, bio, location, company },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Send connection request
router.post('/connect/:id', auth, async (req, res) => {
  try {
    const { message } = req.body;
    const targetUserId = req.params.id;
    const currentUserId = req.user.id;

    if (targetUserId === currentUserId) {
      return res.status(400).json({ message: 'Cannot connect with yourself' });
    }

    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        { sender: currentUserId, recipient: targetUserId },
        { sender: targetUserId, recipient: currentUserId }
      ]
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'Connection request already exists' });
    }

    const connectionRequest = new ConnectionRequest({
      sender: currentUserId,
      recipient: targetUserId,
      message
    });

    await connectionRequest.save();

    // Create notification
    const notification = new Notification({
      recipient: targetUserId,
      sender: currentUserId,
      type: 'connection_request',
      message: 'sent you a connection request'
    });
    await notification.save();

    res.json({ message: 'Connection request sent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get connection requests
router.get('/connection-requests', auth, async (req, res) => {
  try {
    const requests = await ConnectionRequest.find({
      recipient: req.user.id,
      status: 'pending'
    }).populate('sender', 'name company');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Accept/reject connection request
router.put('/connection-request/:id/:action', auth, async (req, res) => {
  try {
    const { id, action } = req.params;
    const request = await ConnectionRequest.findById(id);

    if (!request || request.recipient.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Request not found' });
    }

    request.status = action;
    await request.save();

    if (action === 'accepted') {
      // Add connection both ways
      await User.findByIdAndUpdate(request.sender, {
        $push: { connections: request.recipient }
      });
      await User.findByIdAndUpdate(request.recipient, {
        $push: { connections: request.sender }
      });

      // Create notification
      const notification = new Notification({
        recipient: request.sender,
        sender: request.recipient,
        type: 'connection_accepted',
        message: 'accepted your connection request'
      });
      await notification.save();
    }

    res.json({ message: `Connection request ${action}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search users
router.get('/search/:query', async (req, res) => {
  try {
    const users = await User.find({
      $or: [
        { name: { $regex: req.params.query, $options: 'i' } },
        { company: { $regex: req.params.query, $options: 'i' } }
      ]
    }).select('-password').limit(10);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user settings
router.put('/settings', auth, async (req, res) => {
  try {
    const { settings } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { settings },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get top posts (most reactions)
router.get('/top-posts', async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $addFields: {
          totalReactions: {
            $add: [
              { $size: '$reactions.like' },
              { $size: '$reactions.love' },
              { $size: '$reactions.laugh' },
              { $size: '$reactions.angry' }
            ]
          }
        }
      },
      { $sort: { totalReactions: -1, createdAt: -1 } },
      { $limit: 10 }
    ]);

    await Post.populate(posts, { path: 'author', select: 'name company' });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;