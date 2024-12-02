const express = require('express')
const { aiRouter } = require('./ai')

const app = express();
app.use(express.json());

app.use('/ai', aiRouter);

export default app;