'use client';
import React, { useState } from 'react';
import { Box, TextField, Button, InputAdornment, Alert, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { forgotPasswordApi } from '@/services/api';
import ResetPasswordForm from './ResetPassword';

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});

const ForgetPasswordForm = () => {
  const [showResetPasswordStep, setShowResetPasswordStep] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: any) => {
    setError(null);
    try {
      await forgotPasswordApi({ email: data.email });
      setUserEmail(data.email);
      setShowResetPasswordStep(true);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send OTP. Try again.');
    }
  };

  if (showResetPasswordStep) {
    return <ResetPasswordForm email={userEmail} />;
  }

  return (
    <Box sx={{ mt: 2 }}>
      {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            {...form.register('email')}
            error={!!form.formState.errors.email}
            helperText={form.formState.errors.email?.message as string}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
                </InputAdornment>
              ),
            }}
            sx={{ input: { color: '#fff' }, fieldset: { borderColor: '#555' } }}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={form.formState.isSubmitting}
            sx={{
              mt: 1,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #4b6cb7 0%, #182848 100%)',
            }}
          >
            {form.formState.isSubmitting ? 'Sending OTP...' : 'Send OTP'}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
export default ForgetPasswordForm;