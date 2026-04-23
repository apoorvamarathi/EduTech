const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // In a real scenario, you'd use a service like SendGrid, Mailgun, or Gmail.
  // For development, we'll log to the console as per the implementation plan.
  
  console.log('-----------------------------------------');
  console.log(`Sending Email to: ${options.email}`);
  console.log(`Subject: ${options.subject}`);
  console.log(`Message: ${options.message}`);
  console.log('-----------------------------------------');

  // If you want to use a real mailer (like Mailtrap for testing), you can uncomment this:
  /*
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `EduTech <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
  */
  
  return true;
};

module.exports = sendEmail;
