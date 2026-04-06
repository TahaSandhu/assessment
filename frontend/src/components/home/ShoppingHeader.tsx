'use client';
import React from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';

import { ShoppingHeaderProps } from './types';

const ShoppingHeader = ({ title, setTitle, count, setCount, onAdd }: ShoppingHeaderProps) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography 
        variant="h3" 
        sx={{ 
          fontWeight: 900, 
          mb: 4, 
          textAlign: 'center', 
          color: '#fff',
          textShadow: '0 0 20px rgba(255,255,255,0.2)'
        }}
      >
        Shopping List
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          placeholder="Title..."
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              '& fieldset': { borderColor: 'transparent' },
              '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
              '&.Mui-focused fieldset': { borderColor: '#fbc02d' },
            },
          }}
        />
        
        <TextField
          placeholder="14"
          type="text"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          sx={{
            width: '80px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              '& fieldset': { borderColor: 'transparent' },
              '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
              '&.Mui-focused fieldset': { borderColor: '#fbc02d' },
            },
          }}
        />

        <Button
          onClick={onAdd}
          variant="outlined"
          sx={{
            py: 1.8,
            px: 4,
            borderColor: '#fbc02d',
            color: '#fbc02d',
            fontWeight: 'bold',
            borderRadius: 3,
            '&:hover': {
              borderColor: '#fff',
              background: 'rgba(251, 192, 45, 0.1)',
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
