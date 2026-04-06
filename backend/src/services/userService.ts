import bcrypt from 'bcryptjs';
import otpGenerator from 'otp-generator';
import userRepository from '../repository/userRepository';
import emailService from '../utilts/emailService';

class UserService {
  async signupUser(email: string, password: string) {
    // 1. Check if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // 2. Hash Password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 3. Generate 6-digit OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });

    // 4. Set OTP expiry (10 minutes)
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // 5. Create user (but isVerified: false)
    const newUser = await userRepository.create({
      email,
      password: hashedPassword,
      otp,
      otpExpiresAt,
      isVerified: false,
    });

    // 6. Send OTP Email
    // Note: We don't wait for email to send before responding for performance, 
    // but we'll await it for now to handle errors better
    await emailService.sendOtpEmail(email, otp);

    return {
      userId: newUser._id,
      message: 'Signup successful. Please check your email for the OTP.',
    };
  }

  async verifyOtp(email: string, otp: string) {
    // 1. Find user
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    if (user.isVerified) {
      throw new Error('User already verified');
    }

    // 2. Validate OTP
    if (user.otp !== otp) {
      throw new Error('Invalid OTP code');
    }

    // 3. Check Expiry
    if (user.otpExpiresAt && user.otpExpiresAt < new Date()) {
      throw new Error('OTP has expired');
    }

    // 4. Verify user and clear OTP fields
    await userRepository.updateByEmail(email, {
      isVerified: true,
      otp: null,
      otpExpiresAt: null,
    });

    return {
      message: 'Email verified successfully. You can now log in.',
    };
  }
}

export default new UserService();
