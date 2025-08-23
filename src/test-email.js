require('dotenv').config(); // If not already
const nodemailer = require('nodemailer'); // Assume installed

async function test() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.verify();
    console.log('SMTP connection valid');
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: 'abhilash.m.git@gmail.com', // Use a real email
      subject: 'Test Email',
      text: 'This is a test.',
    });
    console.log('Test email sent:', info);
  } catch (err) {
    console.error('Email test failed:', err);
  }
}
test();