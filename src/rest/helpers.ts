import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Response } from 'express';

import { statusText, STATUS_INTERNAL_SERVER_ERROR } from './statuscodes';

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

export function decodeToken(token: string) {
  return jwt.decode(token, { json: true });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.SECRET_KEY);
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
  error?: string;
}

export function errorResponse(res: Response, error: ErrorResponse) {
  error.status = statusText(error.code);
  res.status(error.code).json(error);
}

export function serverError(res: Response, err: Error) {
  errorResponse(res, {
    message: "Something went wrong, we're working on it.",
    code: STATUS_INTERNAL_SERVER_ERROR,
    error: process.env.NODE_ENV === 'production' ? err.message : err.stack,
  });
}
