import { Router, Request, Response } from 'express';

import authRoutes from './authenticaton/routes';
import recipesRoutes from './recipes/routes';
import categoryRoutes from './categories/routes';
import { withValidation } from './middlewares';

const restRouter = Router();
restRouter.use('/recipes/categories', categoryRoutes);
restRouter.use('/recipes', recipesRoutes);
restRouter.use('/auth', authRoutes);
restRouter.use(withValidation);

export default restRouter;
