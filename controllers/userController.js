const bcrypt = require('bcrypt');
const User = require('../models/User');
const config = require('config');
const jsonwebtoken = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const i18n = require('i18n');
const accountConfirmationEmail = require('../emails/accountConfirmationEmail');
const crypto = require('crypto');

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

    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.confirmationCode = crypto.randomBytes(16).toString('hex');

    await user.save();

    const mailResponse = accountConfirmationEmail(
      req.headers.host,
      user.id,
      firstname,
      email,
      user.confirmationCode
    );

    //signJwt(res, user.id);
    res.json({ user: user.id });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error });
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

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return errorResponse(res, 400, i18n.__('invalid_login'));
    if (!user.emailVerified)
      return errorResponse(res, 400, i18n.__('email_not_verified'));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return errorResponse(res, 400, i18n.__('invalid_login'));

    signJwt(res, user.id);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
};

const verifyEmail = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ error: i18n.__('user_not_found') });
  if (req.params.token !== user.confirmationCode)
    return res.status(400).json({ error: i18n.__('invalid_link') });

  user.emailVerified = true;
  await user.save();

  res.redirect('/');
};

const signJwt = (res, id) => {
  jsonwebtoken.sign(
    { user: { id } },
    config.get('jwtSecret'),
    {
      expiresIn: '1h',
    },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
};

const errorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ error: message });
};

const userController = {
  createUser,
  getAllUsers,
  loginUser,
  verifyEmail,
};

module.exports = userController;
