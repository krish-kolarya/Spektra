import nodemailer from "nodemailer";

export async function sendWelcomeEmail(email, name) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    from: `"Spektra" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Welcome to Spektra!",
    html: `
      <h2>Hi ${name},</h2>
      <p>Welcome to <strong>Spektra</strong>! 🌟</p>
      <p>We're excited to have you on board. Here at Spektra, you can:</p>
      <ul>
        <li>Connect with users from around the world</li>
        <li>Learn and practice new languages</li>
        <li>Chat via real-time video calls</li>
      </ul>
      <p>Start exploring and make the most of your language learning journey!</p>
      <br/>
      <p>— The Spektra Team</p>
    `,
  });
}

export default sendWelcomeEmail;