const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { createUser, getAllUsers } = require('../controllers/userController');

// route POST api/users
// create a user
router.post(
  '/',
  [
    body('firstname', 'firstname is required').not().isEmpty(),
    body('lastname', 'lastname is required').not().isEmpty(),
    body('username', 'username is required').not().isEmpty(),
    body('email', 'email is required').not().isEmpty(),
    body('password', 'password with min 6 characters is required')
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
  ],
  createUser
);

// @route GET api/users
// get all users
//
router.get('/', getAllUsers);

module.exports = router;
