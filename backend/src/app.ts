import express, { Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const app = express();

// Load Swagger document
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yml'));

app.use(cors());
app.use(express.json());

// Swagger Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

export default app;
