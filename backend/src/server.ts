import dotenv from 'dotenv';
import app from './app';
import connectDB from './db';

dotenv.config();

const port = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}).catch((error) => {
  console.error(`[server]: Failed to connect to database: ${error.message}`);
  process.exit(1);
});
