const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const i18n = require('i18n');
const { body } = require('express-validator');
const auth = require('../middlewares/auth');
const { getAllPosts, createPost } = require('../controllers/postController');

// @route POST /api/posts/
// desc create a new post
// Private
router.post(
  '/',
  [
    auth,
    body('title', 'title is required').not().isEmpty(),
    body('content', 'content is required').not().isEmpty(),
  ],
  createPost
);

// @route GET /api/posts/
// get all posts  ==> pagination
// Private
router.get('/', getAllPosts);

module.exports = router;
