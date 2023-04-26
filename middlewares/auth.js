const jwt = require('jsonwebtoken');
const config = require('config');
const i18n = require('i18n');

const auth = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: i18n.__('auth_token_not_found') });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: i18n.__('invalid_auth_token') });
  }
};

module.exports = auth;
