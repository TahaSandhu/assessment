'use client';
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { ShoppingItemProps } from './types';

const ShoppingItem = ({ id, count, title, completed = false, onDelete, onToggle }: ShoppingItemProps) => {
  return (
    <Box 
      onClick={() => onToggle?.(id, !completed)}
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        py: 2,
        borderBottom: '1px solid rgba(251, 192, 45, 0.3)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:last-child': { borderBottom: 'none' },
        '&:hover': {
          background: 'rgba(255, 255, 255, 0.02)',
        },
        opacity: completed ? 0.5 : 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box 
          sx={{ 
            width: 32, 
            height: 32, 
            background: completed ? 'rgba(251, 192, 45, 0.2)' : '#fbc02d', 
            borderRadius: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: completed ? 'none' : '0 0 10px rgba(251, 192, 45, 0.5)',
            transition: 'all 0.3s ease',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 800, color: completed ? 'rgba(0,0,0,0.5)' : '#000' }}>
            {count}
          </Typography>
        </Box>
        <Typography 
          variant="body1" 
          sx={{ 
            fontWeight: 500, 
            color: 'rgba(255,255,255,0.9)',
            letterSpacing: '0.5px',
            textDecoration: completed ? 'line-through' : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          {title}
        </Typography>
      </Box>

      <IconButton 
        onClick={(e) => {
          e.stopPropagation(); // Prevent toggling when deleting
          onDelete(id);
        }}
        sx={{ 
          color: '#fbc02d', 
          '&:hover': { color: '#fff' } 
        }}
        size="small"
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default ShoppingItem;
