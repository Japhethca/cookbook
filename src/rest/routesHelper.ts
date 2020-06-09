import { Response, RequestHandler, IRouter } from 'express';
import { validate, Joi } from 'express-validation';

import { withAuthentication } from './authenticaton/middleware';
import { errorResponse } from './helpers';
import { STATUS_METHOD_NOT_ALLOWED } from './statuscodes';

interface IValidatorOPtions {
  body?: any;
  params?: any;
  query?: any;
}

type SupportedMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface IRoute {
  method: SupportedMethods;
  path: string;
  handler: RequestHandler;
  validate?: IValidatorOPtions;
  requiresAuth?: boolean;
}

export function registerRoutes(router: IRouter, routes: IRoute[]): IRouter {
  for (const route of routes) {
    const middlewares: RequestHandler[] = [];

    if (route.requiresAuth) {
      middlewares.push(withAuthentication);
    }

    if (route.validate) {
      const schema: IValidatorOPtions = {
        body: Joi.object(route.validate.body),
        params: Joi.object(route.validate.params),
        query: Joi.object(route.validate.query),
      };

      middlewares.push(validate(schema, {}, { abortEarly: false }));
    }

    switch (route.method.toUpperCase()) {
      case 'GET':
        router.get(route.path, ...middlewares, route.handler);
        continue;
      case 'PUT':
        router.put(route.path, ...middlewares, route.handler);
        continue;
      case 'POST':
        router.post(route.path, ...middlewares, route.handler);
        continue;
      case 'DELETE':
        router.delete(route.path, ...middlewares, route.handler);
        continue;
      case 'PATCH':
        router.patch(route.path, ...middlewares, route.handler);
        continue;
      default:
        continue;
    }
  }
  return router;
}

function methodNotImplemented(req: Request, res: Response) {
  return errorResponse(res, {
    message: `Method ${req.method} not implemented`,
    code: STATUS_METHOD_NOT_ALLOWED,
  });
}
