import { Router } from 'express';

import authRoutes from './authenticaton/routes';
import recipesRoutes from './recipes/routes';
import categoryRoutes from './categories/routes';
import validatorMiddleware from './validator';

const restRouter = Router();
restRouter.use('/recipes/categories', categoryRoutes);
restRouter.use('/recipes', recipesRoutes);
restRouter.use('/auth', authRoutes);
restRouter.use(validatorMiddleware);

export default restRouter;
