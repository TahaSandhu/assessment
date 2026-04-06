import dotenv from 'dotenv';
import app from './app';
import connectDB from './db';

dotenv.config();

const port = process.env.PORT || 5000;

connectDB().catch((error) => {
  console.error(`[server]: Failed to connect to database: ${error.message}`);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  console.log(`[server]: Swagger documentation at http://localhost:${port}/api-docs`);
});
