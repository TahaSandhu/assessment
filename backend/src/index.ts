import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    message: 'Backend server is running correctly',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/info', (req: Request, res: Response) => {
  res.json({
    app: 'Interview Task Backend',
    version: '1.0.0',
    framework: 'Express + TypeScript',
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
