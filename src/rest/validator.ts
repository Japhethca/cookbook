import { ValidationError } from 'express-validation';
import { ErrorRequestHandler, Request, NextFunction, Response } from 'express';

export default function validationMiddleware(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  next();
}
