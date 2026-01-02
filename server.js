const express = require('express');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const app = express();
app.use(helmet()); // Security headers
app.use(express.json({limit: '10kb'}));
const limiter = rateLimit({windowMs: 15*60*1000, max: 5});
app.use('/api/contact', limiter);

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use app password
  auth: {user: 'your@gmail.com', pass: 'app-password'}
});

app.post('/api/contact', (req, res) => {
  const {name, email, subject, message} = req.body;
  // Sanitize
  if (!name || !email || !message || !subject) return res.status(400).json({error: 'Missing fields'});
  
  transporter.sendMail({
    from: email,
    to: 'your@gmail.com',
    subject: `Contact: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  }).then(() => res.json({success: true}))
    .catch(() => res.status(500).json({error: 'Send failed'}));
});

app.listen(3000);
