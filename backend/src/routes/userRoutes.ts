import { Router } from 'express';
import * as userController from '../controller/userControler';

const router = Router();

// Signup Route
router.post('/signup', userController.signup);

// OTP Verification Route
router.post('/verify-otp', userController.verifyOtp);

// Login Route
router.post('/login', userController.login);

// Forgot Password Route
router.post('/forgot-password', userController.forgotPassword);

// Reset Password Route
router.post('/reset-password', userController.resetPassword);

export default router;
