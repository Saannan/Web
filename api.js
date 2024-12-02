import express from 'express';
import aiRouter from './api/ai.js';

const app = express();
app.use(express.json());

app.use('/api/ai', aiRouter);

export default app;