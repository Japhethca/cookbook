import express, { Application } from 'express';
import cors from 'cors';

import restRoutes from './rest/apiRoutes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', restRoutes);

export default app;
