import dotenv from 'dotenv';
import app from './app';
import connectDB from './db';

dotenv.config();

const port = process.env.PORT || 5000;

// Connect to Database
connectDB().catch((error) => {
  console.error(`[server]: Failed to connect to database: ${error.message}`);
});

// Start server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  console.log(`[server]: Swagger documentation at http://localhost:${port}/api-docs`);
});
