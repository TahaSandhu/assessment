'use client';
import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  InputAdornment, 
  IconButton,
  Typography,
  Alert
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { darkTextFieldStyles } from '@/lib/themeStyles';
import { signupSchema, otpSchema } from './schema';
import { signupApi, verifyOtpApi } from '@/services/api';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const signupForm = useForm({
    resolver: yupResolver(signupSchema),
  });

  const otpForm = useForm({
    resolver: yupResolver(otpSchema),
  });

  const onSignupSubmit = async (data: any) => {
    setError(null);
    try {
      await signupApi(data);
      setUserEmail(data.email);
      setIsOtpStep(true);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    }
  };

  const onOtpSubmit = async (data: any) => {
    setError(null);
    try {
      await verifyOtpApi({ email: userEmail, otp: data.otp });
      alert('Verification successful! Please log in.');
      router.push('/signin');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Verification failed. Please check your OTP.');
    }
  };

  if (isOtpStep) {
    return (
      <Box sx={{ mt: 2 }}>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            We've sent a 6-digit code to <strong>{userEmail}</strong>.
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

        <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} noValidate>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Enter 6-digit OTP"
              {...otpForm.register('otp')}
              error={!!otpForm.formState.errors.otp}
              helperText={otpForm.formState.errors.otp?.message as string}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
                  </InputAdornment>
                ),
              }}
              sx={darkTextFieldStyles}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={otpForm.formState.isSubmitting}
              sx={{
                mt: 1,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #4b6cb7 0%, #182848 100%)',
              }}
            >
              {otpForm.formState.isSubmitting ? 'Verifying...' : 'Verify OTP'}
            </Button>

            <Button
              fullWidth
              variant="text"
              onClick={() => setIsOtpStep(false)}
              sx={{ color: 'rgba(255,255,255,0.5)', textTransform: 'none' }}
            >
              Back to Sign Up
            </Button>
          </Box>
        </form>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

      <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} noValidate>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
              fullWidth
              label="Username"
              {...signupForm.register('username')}
              error={!!signupForm.formState.errors.username}
              helperText={signupForm.formState.errors.username?.message as string}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
                  </InputAdornment>
                ),
              }}
              sx={darkTextFieldStyles}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              {...signupForm.register('email')}
              error={!!signupForm.formState.errors.email}
              helperText={signupForm.formState.errors.email?.message as string}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
                  </InputAdornment>
                ),
              }}
              sx={darkTextFieldStyles}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              {...signupForm.register('password')}
              error={!!signupForm.formState.errors.password}
              helperText={signupForm.formState.errors.password?.message as string}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: 'rgba(255,255,255,0.5)' }}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={darkTextFieldStyles}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={signupForm.formState.isSubmitting}
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #4b6cb7 0%, #182848 100%)',
              }}
            >
              {signupForm.formState.isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </Button>
        </Box>
      </form>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
          Already have an account?{' '}
          <Link href="/signin" style={{ color: '#4b6cb7', textDecoration: 'none', fontWeight: 'bold' }}>
            Log In
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
