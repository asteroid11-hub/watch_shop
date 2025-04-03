const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.elasticemail.com',
  port: 2525,
  secure: false,
  auth: {
    user: 'aeternis@aeternis.com',
    pass: 'B77CA4A9B20406E61B7E6A81EBE5B48C10D77F8211745F09C3A6C9C8CB1A31C9A2461B228A6BE9427E189C9AD925FFC9',
  },
});

async function sendEmail(to, subject, text) {
  try {
    const info = await transporter.sendMail({
      from: '"Aeternis" <aeternis@aeternis.com>',
      to,
      subject,
      text,
    });
    console.log('Email отправлен! ID:', info.messageId);
  } catch (error) {
    console.error('Ошибка при отправке email:', error);
  }
}

module.exports = sendEmail;
