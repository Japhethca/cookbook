import { Router } from 'express';
import { Joi } from 'express-validation';

import {
  createRecipe,
  getRecipe,
  getAllRecipes,
  deleteRecipe,
  updateRecipe,
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
        coverImage: Joi.string().uri({ allowRelative: true }).optional(),
        published: Joi.boolean().optional(),
        steps: Joi.array()
          .items(
            Joi.object({
              text: Joi.string().required(),
              id: Joi.number().optional(),
              photo: Joi.string().optional(),
            })
          )
          .optional(),
        ingredients: Joi.array()
          .items(
            Joi.object({
              text: Joi.string().required(),
              id: Joi.number().optional(),
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
  {
    method: 'PUT',
    path: '/:recipeId',
    handler: updateRecipe,
    requiresAuth: true,
    validate: {
      params: {
        recipeId: Joi.number().required(),
      },
      body: {
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        coverImage: Joi.string().uri({ allowRelative: true }).optional(),
        published: Joi.boolean().optional(),
        steps: Joi.array()
          .items(
            Joi.object({
              text: Joi.string().required(),
              id: Joi.number().optional(),
              photo: Joi.string().optional(),
            })
          )
          .optional(),
        categories: Joi.array()
          .items(
            Joi.object({
              name: Joi.string().optional(),
              id: Joi.number().optional(),
            })
          )
          .optional(),
        ingredients: Joi.array()
          .items(
            Joi.object({
              text: Joi.string().required(),
              id: Joi.number().optional(),
            })
          )
          .optional(),
      },
    },
  },
];

export default registerRoutes(Router(), routes);
