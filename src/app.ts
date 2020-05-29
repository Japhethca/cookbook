import express, { Application } from 'express';

const app: Application = express();

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

export default app;
