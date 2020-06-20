import { Router } from 'express';

import { registerRoutes, IRoute } from '../routesHelper';
import {
  getCategories,
  createOrUpdateCategory,
  deleteCategory,
} from './handlers';
import { Joi } from 'express-validation';

const routes: IRoute[] = [
  {
    method: 'GET',
    path: '/',
    handler: getCategories,
  },
  {
    method: 'POST',
    path: '/',
    requiresAuth: true,
    handler: createOrUpdateCategory,
    validate: {
      body: {
        id: Joi.number().optional(),
        name: Joi.string().required(),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/:categoryId',
    requiresAuth: true,
    handler: deleteCategory,
    validate: {
      params: {
        categoryId: Joi.number().required(),
      },
    },
  },
];

export default registerRoutes(Router(), routes);
