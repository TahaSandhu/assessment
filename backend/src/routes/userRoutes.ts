import { Router } from 'express';
import userController from '../controller/userControler';

const router = Router();

// Signup Route
router.post('/signup', userController.signup);

// OTP Verification Route
router.post('/verify-otp', userController.verifyOtp);

export default router;
