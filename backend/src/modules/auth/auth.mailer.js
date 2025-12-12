import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure:
    process.env.SMTP_SECURE === "true" ||
    process.env.SMTP_PORT === "465" ||
    false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendMail({ to, subject, html }) {
  if (!process.env.SMTP_HOST) {
    throw new Error("SMTP not configured");
  }

  await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME || "No Reply"}" <${
      process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER
    }>`,
    to,
    subject,
    html,
  });
}
