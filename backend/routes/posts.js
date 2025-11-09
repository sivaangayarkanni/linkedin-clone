const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name company')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'name' },
        options: { sort: { createdAt: -1 }, limit: 3 }
      })
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create post
router.post('/', auth, async (req, res) => {
  try {
    const { content } = req.body;
    
    const post = new Post({
      content,
      author: req.user._id
    });
    
    await post.save();
    await post.populate('author', 'name');
    
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// React to post
router.post('/:id/react', auth, async (req, res) => {
  try {
    const { reactionType } = req.body;
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Remove user from all reaction types
    ['like', 'love', 'laugh', 'angry'].forEach(type => {
      post.reactions[type] = post.reactions[type].filter(
        id => id.toString() !== req.user._id.toString()
      );
    });

    // Add to new reaction type if provided
    if (reactionType && post.reactions[reactionType]) {
      post.reactions[reactionType].push(req.user._id);
    }
    
    await post.save();
    await post.populate('author', 'name company');
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;