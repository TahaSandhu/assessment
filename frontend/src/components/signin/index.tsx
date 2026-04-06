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
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { darkTextFieldStyles } from '@/lib/themeStyles';
import { signinSchema } from './schema';
import { loginApi } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signinSchema),
  });

  const onSubmit = async (data: any) => {
    setError(null);
    try {
      const response = await loginApi(data);
      const { token } = response.data;
      
      login(token);
      alert('Sign in successful!');
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}
      
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            label="Email or Username"
            {...register('emailOrUsername')}
            error={!!errors.emailOrUsername}
            helperText={errors.emailOrUsername?.message as string}
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
            label="Password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message as string}
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
            disabled={isSubmitting}
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #4b6cb7 0%, #182848 100%)',
            }}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </Button>
        </Box>
      </form>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
          Don't have an account?{' '}
          <Link href="/signup" style={{ color: '#4b6cb7', textDecoration: 'none', fontWeight: 'bold' }}>
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
