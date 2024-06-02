import express from 'express';
import dotenv from 'dotenv';
import pino from 'pino-http';

import connectToMongoDB from './db/connectToMongoDB.js';
import authRoutes from './routes/auth.routes.js';
import logger from './utils/logger.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(pino());

app.use('/api/v1/auth', authRoutes);

app.all('*', (req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

app.listen(PORT, () => {
  connectToMongoDB();
  logger.info(`Server started on port ${PORT}`);
});
