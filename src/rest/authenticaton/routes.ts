import { Router } from 'express';
import { Joi } from 'express-validation';

import { login, signup } from './handlers';
import { registerRoutes, IRoute } from '../routesHelper';

const routes: IRoute[] = [
  {
    method: 'POST',
    path: '/login',
    handler: login,
    validate: {
      body: {
        email: Joi.string().required(),
        password: Joi.string().required(),
      },
    },
  },
  {
    method: 'POST',
    path: '/signup',
    handler: signup,
    validate: {
      body: {
        email: Joi.string().required(),
        password: Joi.string().required(),
        firstname: Joi.string().optional(),
        lastname: Joi.string().optional(),
      },
    },
  },
];

export default registerRoutes(Router(), routes);
