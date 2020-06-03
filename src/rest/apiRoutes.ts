import { Router } from 'express';

import authRoutes from './authenticaton/routes';
import validatorMiddleware from './validator';

const restRouter = Router();
restRouter.use('/auth', authRoutes);
restRouter.use(validatorMiddleware);

export default restRouter;
