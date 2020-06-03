import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Response, RequestHandler, IRouter, NextFunction } from 'express';
import { validate } from 'express-validation';
import { statusText } from './statuscodes';

dotenv.config();

const HASH_SALT = 10;

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, HASH_SALT);
}

export function comparePassword(password: string, hashed: string): boolean {
  return bcrypt.compareSync(password, hashed);
}

interface IPayload {
  id?: string | number;
  username?: string;
}

export function createToken(
  payload: IPayload,
  expiresIn: string = '1d'
): string {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn });
}

export function successResponse(
  res: Response,
  data: any,
  statuscode: number = 200
) {
  res.status(statuscode).json(data);
}

interface ErrorResponse {
  message?: string;
  status?: string;
  code: number;
  details?: string;
}

export function errorResponse(res: Response, error: ErrorResponse) {
  error.status = statusText(error.code);
  res.status(error.code).json(error);
}

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
}

export function registerRoutes(router: IRouter, routes: IRoute[]): IRouter {
  for (const route of routes) {
    let validator: any = (rq: Request, rs: Response, next: NextFunction) =>
      next();

    if (route.validate) {
      validator = validate(route.validate, {}, { abortEarly: false });
    }

    switch (route.method.toUpperCase()) {
      case 'GET':
        router.get(route.path, validator, route.handler);
        continue;
      case 'PUT':
        router.put(route.path, validator, route.handler);
        continue;
      case 'POST':
        router.post(route.path, validator, route.handler);
        continue;
      case 'DELETE':
        router.delete(route.path, validator, route.handler);
        continue;
      case 'PATCH':
        router.patch(route.path, validator, route.handler);
        continue;
      default:
        continue;
    }
  }
  return router;
}
