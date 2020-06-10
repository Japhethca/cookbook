import { Request, Response } from 'express';

import {
  createToken,
  errorResponse,
  successResponse,
  comparePassword,
  serverError,
} from '../helpers';
import UserRepository from '../../db/repositories/UserRepository';
import { DoesNotExistError, AlreadyExistsError } from '../../db/errors';
import * as httpstatus from '../statuscodes';
import User from '../../db/entity/User';

export async function login(req: Request, res: Response) {
  const userRepository = new UserRepository();
  const { email, password } = req.body;
  try {
    const user = await userRepository.getUserByEmail(email);

    if (!comparePassword(password, user.password)) {
      return errorResponse(res, {
        message: 'Incorrect credentials',
        code: httpstatus.STATUS_BAD_REQUEST,
      });
    }

    const token = createToken({ id: user.userId });
    setTokenCookie(res, token);

    successResponse(res, user);
  } catch (err) {
    if (err instanceof DoesNotExistError) {
      return errorResponse(res, {
        message: 'User does not exist',
        code: httpstatus.STATUS_NOT_FOUND,
      });
    }

    return serverError(res, err);
  }
}

export async function signup(req: Request, res: Response) {
  const userRepository = new UserRepository();
  try {
    const newUser = await userRepository.createUser(req.body);

    const token = createToken({ id: newUser.userId });
    setTokenCookie(res, token);

    successResponse(res, newUser, httpstatus.STATUS_CREATED);
  } catch (err) {
    if (err instanceof AlreadyExistsError) {
      return errorResponse(res, {
        message: 'User already exists',
        code: httpstatus.STATUS_CONFLICT,
      });
    }

    return serverError(res, err);
  }
}

function setTokenCookie(res: Response, token: string) {
  res.cookie('X-token', token, { httpOnly: true, secure: true });
}
