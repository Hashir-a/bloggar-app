const nodemailer = require('nodemailer');
const config = require('config');

const transporter = nodemailer.createTransport(
  {
    host: 'smtp.gmail.com',
    port: 587,
    sercure: false,
    requireTLS: true,
    auth: {
      user: config.get('user'),
      pass: config.get('appPassword'),
    },
  }
);

module.exports = transporter;
