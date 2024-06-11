import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';

import connectToMongoDB from './db/connectToMongoDB.js';
import logger from './utils/logger.js';

import authRoutes from './routes/auth.routes.js';
import requestRoutes from './routes/request.routes.js';
import userRoutes from './routes/user.routes.js';
import friendRoutes from './routes/friend.routes.js';
import messageRoutes from './routes/message.routes.js';
import { app, server } from './socket/socket.js';

dotenv.config();

const PORT = process.env.PORT || 8000;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(pino());
}

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/requests', requestRoutes);
app.use('/api/v1/friends', friendRoutes);
app.use('/api/v1/messages', messageRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

/*
app.all('*', (req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});*/

server.listen(PORT, () => {
  connectToMongoDB();
  logger.info(`Server started on port ${PORT}`);
});
