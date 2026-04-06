import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import * as userRepository from '../repository/userRepository';
import { sendOtpEmail } from '../utilts/emailService';

export const signupUser = async (email: string, password: string, username: string) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  const existingUsername = await userRepository.findByUsername(username);
  if (existingUsername) {
    throw new Error('Username is already taken');
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
    digits: true,
  });

  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

  const newUser = await userRepository.createUser({
    email,
    username,
    password: hashedPassword,
    otp,
    otpExpiresAt,
    isVerified: false,
  });

  await sendOtpEmail(email, otp);

  return {
    userId: newUser._id,
    message: 'Signup successful. Please check your email for the OTP.',
  };
};

export const verifyOtp = async (email: string, otp: string) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }

  if (user.isVerified) {
    throw new Error('User already verified');
  }

  if (user.otp !== otp) {
    throw new Error('Invalid OTP code');
  }

  if (user.otpExpiresAt && user.otpExpiresAt < new Date()) {
    throw new Error('OTP has expired');
  }

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
  let user = await userRepository.findByEmail(emailOrUsername);
  if (!user) {
    user = await userRepository.findByUsername(emailOrUsername);
  }

  if (!user) {
    throw new Error('Invalid credentials');
  }

  if (!user.isVerified) {
    throw new Error('Please verify your email before logging in');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error('Invalid credentials');
  }

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
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error('User not found with this email');
  }

  const resetOtp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
    digits: true,
  });

  const resetOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await userRepository.updateByEmail(email, {
    resetOtp,
    resetOtpExpiresAt,
  });

  await sendOtpEmail(email, resetOtp);

  return {
    message: 'Password reset OTP sent to your email.',
  };
};

export const resetPassword = async (email: string, otp: string, newPassword: string) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }

  if (user.resetOtp !== otp) {
    throw new Error('Invalid reset OTP');
  }

  if (user.resetOtpExpiresAt && user.resetOtpExpiresAt < new Date()) {
    throw new Error('Reset OTP has expired');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await userRepository.updateByEmail(email, {
    password: hashedPassword,
    resetOtp: null,
    resetOtpExpiresAt: null,
  });

  return {
    message: 'Password reset successful. You can now log in with your new password.',
  };
};
