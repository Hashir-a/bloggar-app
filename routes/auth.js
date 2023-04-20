const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) => {
  try {
    
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;
