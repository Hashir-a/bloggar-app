const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const authenticateUser = require('../controllers/auth');

router.get('/', auth, authenticateUser);

module.exports = router;
