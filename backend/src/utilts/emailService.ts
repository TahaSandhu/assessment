import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter | undefined;

const createTransporter = async () => {
  // If real SMTP credentials are provided in .env, use them
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    console.log('[EmailService]: Using real SMTP transporter');
    return;
  }

  // Fallback: Generate test SMTP service account from ethereal.email
  const testAccount = await nodemailer.createTestAccount();

  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
};

export const sendOtpEmail = async (email: string, otp: string) => {
  if (!transporter) {
    await createTransporter();
  }

  if (!transporter) {
    throw new Error('Email transporter not initialized');
  }

  const info = await transporter.sendMail({
    from: '"Interview Task" <auth@interview.task>',
    to: email,
    subject: 'Your Signup OTP',
    text: `Your OTP for signup is: ${otp}. It will expire in 10 minutes.`,
    html: `<b>Your OTP for signup is: ${otp}</b><br>It will expire in 10 minutes.`,
  });

  console.log(`[EmailService]: Message sent: ${info.messageId}`);
  // Only available when sending through an Ethereal account
  if (info.envelope && info.envelope.from === 'auth@interview.task') {
    console.log(`[EmailService]: Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  }

  return info;
};
