import { Router } from 'express';

import authRoutes from './authenticaton/routes';
import recipesRoutes from './recipes/routes';
import validatorMiddleware from './validator';

const restRouter = Router();
restRouter.use('/recipes', recipesRoutes);
restRouter.use('/auth', authRoutes);
restRouter.use(validatorMiddleware);

export default restRouter;
