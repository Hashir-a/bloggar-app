const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const auth = require('../middlewares/auth');
const {
  createUser,
  getAllUsers,
  loginUser,
} = require('../controllers/userController');

// route POST api/users
// create a user
// public
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
// private
router.get('/', auth, getAllUsers);

// @route POST api/users/login
// user login
// public
router.post(
  '/login',
  [
    body('email', 'email is required').not().isEmpty(),
    body('password', 'password is required').not().isEmpty(),
  ],
  loginUser
);

module.exports = router;
