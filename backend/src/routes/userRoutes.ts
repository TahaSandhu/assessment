import { Router } from 'express';
import * as userController from '../controller/userControler';

const router = Router();

router.post('/signup', userController.signup);
router.post('/verify-otp', userController.verifyOtp);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

export default router;
