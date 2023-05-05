const Post = require('../models/Post');
const i18n = require('i18n');
const { validationResult } = require('express-validator');

const createPost = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return res.status(400).json({ error: 'User not found' });

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(404).json({ error: errors.array() });
    const { title, content, images } = req.body;
    const post = new Post({
      title,
      content,
    });
    post.user = user.id;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

const getAllPosts = async (req, res) => {
  // TODO => add pagination
  const posts = await Post.find();

  res.status(200).json(posts);
};

postController = {
  getAllPosts,
  createPost,
};

module.exports = postController;
