const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Authorization token not found' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid authorization token' });
  }
};

module.exports = auth;
