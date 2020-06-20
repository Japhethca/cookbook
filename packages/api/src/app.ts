import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import restRoutes from './rest/routes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', restRoutes);
app.use('*', (_: Request, res: Response) =>
  res.status(404).json({ message: 'Route does not exist.' })
);
export default app;
