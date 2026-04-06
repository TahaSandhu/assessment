'use client';
import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Paper, Button } from '@mui/material';
import Image from 'next/image';
import ShoppingHeader from './ShoppingHeader';
import ShoppingList from './ShoppingList';
import { useAuth } from '@/context/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import { 
  fetchTodosApi, 
  addTodoApi, 
  deleteTodoApi, 
  updateTodoApi 
} from '@/services/api';
import { CircularProgress } from '@mui/material';

import { ShoppingItem } from './types';

const Home = () => {
  const { logout } = useAuth();
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newCount, setNewCount] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const response = await fetchTodosApi(10);
        const mappedItems = response.data.todos.map((t: any) => ({
          id: t.id,
          title: t.todo,
          count: t.userId,
          completed: t.completed,
        }));
        setItems(mappedItems);
      } catch (err) {
        console.error('Failed to fetch todos:', err);
      } finally {
        setLoading(false);
      }
    };
    loadTodos();
  }, []);

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    
    const countValue = newCount.trim() || Math.floor(Math.random() * 100).toString();
    const tempId = Date.now();
    
    const newItem: ShoppingItem = {
      id: tempId,
      title: newTitle,
      count: countValue,
      completed: false,
    };
    
    setItems(prev => [newItem, ...prev]);
    setNewTitle('');
    setNewCount('');

    try {
      await addTodoApi(newTitle, Number(countValue));
    } catch (err) {
      console.error('Failed to add todo:', err);
      setItems(prev => prev.filter(item => item.id !== tempId));
    }
  };

  const handleDelete = async (id: string | number) => {
    let deletedItem: ShoppingItem | undefined;
    
    setItems(prev => {
      deletedItem = prev.find(item => item.id === id);
      return prev.filter((item) => item.id !== id);
    });

    try {
      if (typeof id === 'number' && id > 1000) {
        return;
      }
      await deleteTodoApi(id);
    } catch (err) {
      console.error('Failed to delete todo:', err);
      if (deletedItem) {
        setItems(prev => [...prev, deletedItem!]);
      }
    }
  };

  const handleToggle = async (id: string | number, completed: boolean) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, completed } : item
    ));

    try {
      if (typeof id === 'number' && id > 1000) {
        return;
      }
      await updateTodoApi(id, completed);
    } catch (err) {
      console.error('Failed to toggle todo:', err);
      setItems(prev => prev.map(item => 
        item.id === id ? { ...item, completed: !completed } : item
      ));
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        background: '#0a0b0d',
        overflowX: 'hidden',
      }}
    >
      <Button
        onClick={logout}
        variant="outlined"
        startIcon={<LogoutIcon />}
        sx={{
          position: 'fixed',
          top: 30,
          right: 30,
          borderColor: 'rgba(255,255,255,0.2)',
          color: 'rgba(255,255,255,0.6)',
          borderRadius: 2,
          backdropFilter: 'blur(10px)',
          zIndex: 100,
          '&:hover': {
            borderColor: '#f44336',
            color: '#f44336',
            background: 'rgba(244, 67, 54, 0.05)',
          },
        }}
      >
        Logout
      </Button>

      <Container maxWidth="lg">
        <Grid 
          container 
          spacing={8} 
          alignItems="center" 
          justifyContent="center"
          sx={{ minHeight: '80vh' }}
        >
          <Grid size={{ xs: 12, md: 6, lg: 5 }}>
            <Box sx={{ position: 'relative', width: '100%' }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '120%',
                  height: '120%',
                  background:
                    'radial-gradient(circle, rgba(103, 58, 183, 0.25) 0%, rgba(244, 67, 54, 0.2) 40%, transparent 70%)',
                  filter: 'blur(80px)',
                  zIndex: 0,
                }}
              />

              <Paper
                elevation={24}
                sx={{
                  position: 'relative',
                  padding: { xs: 4, md: 6 },
                  borderRadius: 10,
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(40px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <ShoppingHeader
                  title={newTitle}
                  setTitle={setNewTitle}
                  count={newCount}
                  setCount={setNewCount}
                  onAdd={handleAdd}
                />
                
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress sx={{ color: '#fbc02d' }} />
                  </Box>
                ) : (
                  <ShoppingList 
                    items={items} 
                    onDelete={handleDelete} 
                    onToggle={handleToggle}
                  />
                )}
              </Paper>
            </Box>
          </Grid>

          <Grid
            size={{ xs: 12, md: 6, lg: 7 }}
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: { md: '600px', lg: '700px' },
              }}
            >
              <Image
                src="/img/side-img.png"
                alt="Dot Map"
                fill
                style={{
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 50px rgba(0, 150, 255, 0.15))',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;