'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import ShoppingItem from './ShoppingItem';

import { ShoppingListProps } from './types';

const ShoppingList = ({ items, onDelete, onToggle }: ShoppingListProps) => {
  if (items.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
          Your shopping list is empty.
        </Typography>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        maxHeight: '400px', 
        overflowY: 'auto',
        pr: 1,
        '&::-webkit-scrollbar': { width: '4px' },
        '&::-webkit-scrollbar-thumb': { 
          background: 'rgba(255,255,255,0.1)', 
          borderRadius: 10 
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {items.map((item) => (
          <ShoppingItem
            key={item.id}
            id={item.id}
            count={item.count}
            title={item.title}
            completed={item.completed}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
