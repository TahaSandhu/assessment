import express, { Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import authRoutes from './routes/userRoutes';

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yml'));

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Swagger Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
