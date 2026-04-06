'use client';
import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { authPaperStyles } from '@/lib/themeStyles';
import ForgetPasswordForm from '@/components/forget-password/ForgetPassword';

const ForgetPassword = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 8 }}>
      <Container maxWidth="sm">
        <Paper elevation={24} sx={authPaperStyles}>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.5px' }}>
              Recover Account
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              Enter your email to reset your password
            </Typography>
          </Box>
          <ForgetPasswordForm />
        </Paper>
      </Container>
    </Box>
  );
};
export default ForgetPassword;
