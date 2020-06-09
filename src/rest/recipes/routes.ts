import { Router } from 'express';
import { Joi } from 'express-validation';

import {
  createRecipe,
  getRecipe,
  getAllRecipes,
  deleteRecipe,
} from './handlers';
import { registerRoutes, IRoute } from '../routesHelper';

const routes: IRoute[] = [
  {
    method: 'POST',
    path: '/create',
    handler: createRecipe,
    requiresAuth: true,
    validate: {
      body: {
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        steps: Joi.array()
          .items(
            Joi.object({
              text: Joi.string().required(),
            })
          )
          .optional(),
        ingredients: Joi.array()
          .items(
            Joi.object({
              text: Joi.string().required(),
            })
          )
          .optional(),
      },
    },
  },
  {
    method: 'GET',
    path: '/:recipeId',
    handler: getRecipe,
    validate: {
      params: {
        recipeId: Joi.number().required(),
      },
    },
  },
  {
    method: 'GET',
    path: '',
    handler: getAllRecipes,
  },
  {
    method: 'DELETE',
    path: '/:recipeId',
    handler: deleteRecipe,
    requiresAuth: true,
    validate: {
      params: {
        recipeId: Joi.number().required(),
      },
    },
  },
];

export default registerRoutes(Router(), routes);
