import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import * as userRepository from '../repository/userRepository';
import { sendOtpEmail } from '../utilts/emailService';

export const signupUser = async (email: string, password: string, username: string) => {
  // 1. Check if user already exists
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  // 1.1 Check if username is taken
  const existingUsername = await userRepository.findByUsername(username);
  if (existingUsername) {
    throw new Error('Username is already taken');
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
  const newUser = await userRepository.createUser({
    email,
    username,
    password: hashedPassword,
    otp,
    otpExpiresAt,
    isVerified: false,
  });

  // 6. Send OTP Email
  await sendOtpEmail(email, otp);

  return {
    userId: newUser._id,
    message: 'Signup successful. Please check your email for the OTP.',
  };
};

export const verifyOtp = async (email: string, otp: string) => {
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
};

export const loginUser = async (emailOrUsername: string, password: string) => {
  // 1. Find user by email or username
  let user = await userRepository.findByEmail(emailOrUsername);
  if (!user) {
    user = await userRepository.findByUsername(emailOrUsername);
  }

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // 2. Check if verified
  if (!user.isVerified) {
    throw new Error('Please verify your email before logging in');
  }

  // 3. Compare password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error('Invalid credentials');
  }

  // 4. Generate JWT
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET || 'fallback_secret',
    { expiresIn: '24h' }
  );

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    message: 'Login successful',
  };
};

export const forgotPassword = async (email: string) => {
  // 1. Find user
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error('User not found with this email');
  }

  // 2. Generate Reset OTP
  const resetOtp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
    digits: true,
  });

  // 3. Set Reset Expiry (10 minutes)
  const resetOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

  // 4. Update user
  await userRepository.updateByEmail(email, {
    resetOtp,
    resetOtpExpiresAt,
  });

  // 5. Send Email
  await sendOtpEmail(email, resetOtp); // Reusing sendOtpEmail helper

  return {
    message: 'Password reset OTP sent to your email.',
  };
};

export const resetPassword = async (email: string, otp: string, newPassword: string) => {
  // 1. Find user
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }

  // 2. Validate Reset OTP
  if (user.resetOtp !== otp) {
    throw new Error('Invalid reset OTP');
  }

  // 3. Check Expiry
  if (user.resetOtpExpiresAt && user.resetOtpExpiresAt < new Date()) {
    throw new Error('Reset OTP has expired');
  }

  // 4. Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  // 5. Update user and clear reset fields
  await userRepository.updateByEmail(email, {
    password: hashedPassword,
    resetOtp: null,
    resetOtpExpiresAt: null,
  });

  return {
    message: 'Password reset successful. You can now log in with your new password.',
  };
};
