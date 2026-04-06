'use client';
import { Container, Typography, Box, Button, Stack, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { increment, decrement } from '@/lib/features/counter/counterSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Home() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Next.js + MUI + Redux
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary">
          A premium boilerplate for modern web applications
        </Typography>

        <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 4, textAlign: 'center', minWidth: 300 }}>
          <Typography variant="h6" gutterBottom>
            Redux Toolkit Counter
          </Typography>
          <Typography variant="h3" sx={{ my: 3, fontWeight: 'medium' }}>
            {count}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<RemoveIcon />}
              onClick={() => dispatch(decrement())}
              sx={{ borderRadius: 2 }}
            >
              Decrement
            </Button>
            <Button
              variant="contained"
              color="primary"
              endIcon={<AddIcon />}
              onClick={() => dispatch(increment())}
              sx={{ borderRadius: 2 }}
            >
              Increment
            </Button>
          </Stack>
        </Paper>

        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Built with ❤️ using Next.js 14, Material UI version 6, and Redux Toolkit.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
