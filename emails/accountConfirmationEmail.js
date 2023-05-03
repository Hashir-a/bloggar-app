//const transporter = require('../config/nodemailer.config');
const config = require('config');
const nodemailer = require('nodemailer');
const transporter = require('../config/nodemailer.config');

const accountConfirmationEmail = async (
  host,
  id,
  name,
  email,
  confirmationCode
) => {
  await transporter
    .sendMail({
      from: config.get('user'),
      to: email,
      subject: 'Account verification from Bloggar',
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for signing up. Please confirm your email by clicking on the following link</p>
        <a href=http://${host}/api/users/${id}/confirm/${confirmationCode}> Click here</a>
        </div>`,
    })
    .catch((err) => console.log(err));
};

module.exports = accountConfirmationEmail;
