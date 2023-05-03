const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, 'Kindly provide a valid email address'],
    },
    password: {
      type: String,
      required: true,
      min: [6, 'Minimum password length can be 6 characters'],
    },
    avatar: { type: String, default: '' },
    emailVerified: { type: Boolean, default: false },
    confirmationCode: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model('user', UserSchema);
