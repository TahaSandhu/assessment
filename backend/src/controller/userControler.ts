import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ error: 'Email, password, and username are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const result = await userService.signupUser(email, password, username);
    return res.status(201).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Signup failed';
    return res.status(400).json({ error: errorMessage });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
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
};
