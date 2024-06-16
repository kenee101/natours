const nodemailer = require('nodemailer');
const pug = require('pug');
const { convert } = require('html-to-text');

// new Email(user, url).sendWelcome()

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Usih Elijah <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Brevo
      return nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        // secure: false, // upgrade later with STARTTLS
        auth: {
          user: process.env.USER,
          pass: process.env.BREVO_SMTP_KEY,
        },
      });
    }
    return nodemailer.createTransport({
      // service: 'Gmail',
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render the HTML based on a pug template
    const html = pug.renderFile(
      `${__dirname}/../src/views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      },
    );
    // 2) Define email options
    const options = {
      wordwrap: 130,
      // ...
    };
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html, options),
    };

    // 3) Create a transport and send email

    // verify connection configuration
    await this.newTransport().verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log('Server is ready to take our messages');
      }
    });

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)',
    );
  }
};

// 1) Create a transporter
// const transporter = nodemailer.createTransport({
//   // service: 'Gmail',
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   auth: {
//     user: process.env.EMAIL_USERNAME,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// Activate in gmail "less secure app" option
// });

// const sendEmail = async (options) => {
// 2) Define the email options
// const mailOptions = {
//   from: 'Usih Elijah <usih@gmail.com>',
//   to: options.email,
//   subject: options.subject,
//   text: options.message,
//   // html:
// };
// 3) Actually send the email
// console.log(mailOptions);
// await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;
