import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

//  Sends an email verification link to the user
export const sendVerificationEmail = async (name, email, token) => {
  const verificationLink = `${process.env.BASE_URL}/api/user/verify-email/${token}`;

  await transporter.sendMail({
    from: `Samip's Notes App <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Email",
    html: `
        <p>Hi ${name},</p>
        <p>Thank you for signing up! Please verify your email by clicking the link below:</p>
        <p><a href="${verificationLink}">${verificationLink}</a></p>
        <p>If you did not request this, please ignore this email.</p>
        <p>Best regards,<br>Your App Team</p>
      `,
  });
};
