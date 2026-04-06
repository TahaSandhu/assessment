import { Request, Response } from 'express';
import userService from '../services/userService';

class UserController {
  async signup(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
      }

      const result = await userService.signupUser(email, password);
      return res.status(201).json(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed';
      return res.status(400).json({ error: errorMessage });
    }
  }

  async verifyOtp(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        return res.status(400).json({ error: 'Email and OTP are required' });
      }

      const result = await userService.verifyOtp(email, otp);
      return res.status(200).json(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Verification failed';
      return res.status(400).json({ error: errorMessage });
    }
  }
}

export default new UserController();
