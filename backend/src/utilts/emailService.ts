import nodemailer from "nodemailer";
import dotenv from "dotenv";

const env = dotenv.config();

let transporter: nodemailer.Transporter;

const createTransporter = async () => {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendOtpEmail = async (email: string, otp: string) => {
  if (!transporter) {
    await createTransporter();
  }

  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Signup OTP",
    text: `Your OTP is ${otp}`,
    html: `<b>Your OTP is ${otp}</b>`,
  });

  console.log(info.response);

  return info;
};