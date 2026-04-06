'use client';
import React from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';

import { ShoppingHeaderProps } from './types';

const ShoppingHeader = ({ title, setTitle, count, setCount, onAdd }: ShoppingHeaderProps) => {
  return (
    <Box sx={{ mb: 1.5 }}>
      <Typography 
        variant="h5" 
        sx={{ 
          fontWeight: 900, 
          mb: 1.5, 
          textAlign: 'center', 
          color: '#FFFFFFCC',
          textShadow: '0 0 20px rgba(255,255,255,0.2)'
        }}
      >
        Shopping List
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            width: '192px',
            minWidth: '192px',
            opacity: 1,
            '& .MuiOutlinedInput-root': {
              height: '35px',
              borderRadius: '3px',
              color: '#fff',
              background: 'rgba(255,255,255,0.1)',
              '& fieldset': { borderColor: 'transparent' },
              '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
              '&.Mui-focused fieldset': { borderColor: '#fbc02d' },
            },
            '& .MuiOutlinedInput-input': {
              padding: '0 12px',
              height: '35px',
              boxSizing: 'border-box',
            },
          }}
        />
        
        <TextField
          placeholder="14"
          type="text"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          sx={{
            width: '64px',
            minWidth: '64px',
            opacity: 1,
            '& .MuiOutlinedInput-root': {
              height: '35px',
              borderRadius: '3px',
              color: '#fff',
              background: 'rgba(255,255,255,0.1)',
              '& fieldset': { borderColor: 'transparent' },
              '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
              '&.Mui-focused fieldset': { borderColor: '#fbc02d' },
            },
            '& .MuiOutlinedInput-input': {
              padding: '0 12px',
              height: '35px',
              boxSizing: 'border-box',
            },
          }}
        />

        <Button
          onClick={onAdd}
          variant="contained"
          sx={{
            width: '67px',
            height: '35px',
            minWidth: '67px',
            borderRadius: '5px',
            background: '#FFD700',
            border: '2px solid #FFD700',
            color: '#1a1a1a',
            fontWeight: 'bold',
            fontSize: '14px',
            opacity: 1,
            textTransform: 'none',
            boxShadow: 'none',
            flexShrink: 0,
            '&:hover': {
              background: '#e6c200',
              border: '2px solid #e6c200',
              boxShadow: 'none',
            },
          }}
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
};

export default ShoppingHeader;
