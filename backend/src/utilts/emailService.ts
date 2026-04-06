import nodemailer from 'nodemailer';

class EmailService {
  private transporter: nodemailer.Transporter | undefined;

  constructor() {
    // Note: In production, configure this with real SMTP credentials
    // For development, we'll use Ethereal (fake SMTP)
    this.createTransporter();
  }

  private async createTransporter() {
    // Generate test SMTP service account from ethereal.email
    const testAccount = await nodemailer.createTestAccount();

    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  }

  async sendOtpEmail(email: string, otp: string) {
    if (!this.transporter) {
      throw new Error('Email transporter not initialized');
    }

    const info = await this.transporter.sendMail({
      from: '"Interview Task" <auth@interview.task>',
      to: email,
      subject: 'Your Signup OTP',
      text: `Your OTP for signup is: ${otp}. It will expire in 10 minutes.`,
      html: `<b>Your OTP for signup is: ${otp}</b><br>It will expire in 10 minutes.`,
    });

    console.log(`[EmailService]: Message sent: ${info.messageId}`);
    // Only available when sending through an Ethereal account
    console.log(`[EmailService]: Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    
    return info;
  }
}

export default new EmailService();
