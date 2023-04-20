const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const authenticateUser = require('../controllers/auth');

// @route /api/auth
// des authenticate user
// public
router.get('/', auth, authenticateUser);

module.exports = router;
