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
        email: Joi.string().email().required(),
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
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
        confirmPassword: Joi.string().required().valid(Joi.ref('password')),
        firstname: Joi.string().optional(),
        lastname: Joi.string().optional(),
      },
    },
  },
];

export default registerRoutes(Router(), routes);
