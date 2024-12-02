import express from 'express'
import aiRouter from './ai.js'

const app = express();
app.use(express.json());

app.use('/ai', aiRouter);

export default app;