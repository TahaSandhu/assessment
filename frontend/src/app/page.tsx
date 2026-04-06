'use client';
import React from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SigninForm from '@/components/signin';
import { useAuth } from '@/context/AuthContext';
import { authPaperStyles } from '@/lib/themeStyles';
import HomeLayout from '@/components/home';

export default function Home() {
  const { isAuthenticated, logout } = useAuth();

  // If NOT authenticated, show the Sign In form
  if (!isAuthenticated) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 8 }}>
        <Container maxWidth="sm">
          <Paper elevation={24} sx={authPaperStyles}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.5px' }}>
                Sign In
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                Please log in to access the dashboard
              </Typography>
            </Box>
            <SigninForm />
          </Paper>
        </Container>
      </Box>
    );
  }

  // If authenticated, show the REAL premium Home layout
  return <HomeLayout />;
}
