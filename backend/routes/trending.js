const express = require('express');
const Trending = require('../models/Trending');
const Post = require('../models/Post');

const router = express.Router();

// Get trending hashtags
router.get('/', async (req, res) => {
  try {
    const trending = await Trending.find()
      .sort({ count: -1 })
      .limit(10);
    res.json(trending);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get posts by hashtag
router.get('/:hashtag', async (req, res) => {
  try {
    const posts = await Post.find({
      content: { $regex: `#${req.params.hashtag}`, $options: 'i' }
    })
    .populate('author', 'name company')
    .sort({ createdAt: -1 });
    
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;