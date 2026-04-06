import * as yup from 'yup';

export const signupSchema = yup.object().shape({
  username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
  email: yup.string().required('Email is required').email('Invalid email address'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

export const otpSchema = yup.object().shape({
  otp: yup.string().required('OTP is required').matches(/^[0-9]{6}$/, 'OTP must be exactly 6 digits'),
});
