const bcrypt = require('bcrypt');
const User = require('../models/User');
const config = require('config');
const jsonwebtoken = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { firstname, lastname, username, email, password, avatar } = req.body;

    const user = new User({
      firstname,
      lastname,
      username,
      email,
      password,
      avatar,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    jsonwebtoken.sign(
      { user: { id: user.id } },
      config.get('jwtSecret'),
      {
        expiresIn: '1h',
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token: token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users: users });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
};

const userController = {
  createUser,
  getAllUsers,
};

module.exports = userController;
