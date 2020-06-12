import { Response, RequestHandler, IRouter, Request } from 'express';
import { validate, Joi } from 'express-validation';

import { withAuthentication } from './middlewares';
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
  let routePaths: string[] = [];
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

    routePaths.push(route.path);

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
  routePaths.map(path => router.all(path, methodNotImplemented));
  return router;
}

function methodNotImplemented(req: Request, res: Response) {
  return errorResponse(res, {
    message: `Method ${req.method} not allowed on this endpoint.`,
    code: STATUS_METHOD_NOT_ALLOWED,
  });
}
