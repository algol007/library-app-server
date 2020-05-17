const nodemailer = require('nodemailer');

exports.sendMail = (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Library App Email Confirmation',
    html: `Click this link to activate your account <a href="${process.env.CLIENT_URL}auth/login?token=${token}">Activate Account</a>`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
