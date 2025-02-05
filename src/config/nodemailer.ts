import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const transporter = nodemailer.createTransport(<SMTPTransport.Options>{
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: Boolean(process.env.SMTP_SECURE),
  from: process.env.SMTP_USER,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
