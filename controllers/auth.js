const User = require('../models/User');
const i18n = require('i18n');

const authenticateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user)
      return res.status(404).json({ error: i18n.__('user_not_found') });

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ error: error.message });
  }
};

module.exports = authenticateUser;
