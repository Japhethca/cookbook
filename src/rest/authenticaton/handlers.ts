import { Request, Response } from 'express';

import UserRepository, {
  DoesNotExistError,
  AlreadyExistsError,
} from '../../db/repositories/UserRepository';
import {
  createToken,
  errorResponse,
  successResponse,
  comparePassword,
  hashPassword,
} from '../helpers';
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

    return errorResponse(res, {
      message: 'Something weird happened, its not from you.',
      code: httpstatus.STATUS_INTERNAL_SERVER_ERROR,
      error: err.stack,
    });
  }
}

export async function signup(req: Request, res: Response) {
  const userRepository = new UserRepository();
  try {
    const user = <User>req.body;
    user.password = hashPassword(user.password);
    const newUser = await userRepository.createUser(user);

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

    return errorResponse(res, {
      message: 'Something went wrong, its not you.',
      code: httpstatus.STATUS_INTERNAL_SERVER_ERROR,
      error: err.stack,
    });
  }
}

function setTokenCookie(res: Response, token: string) {
  res.cookie('X-token', token, { httpOnly: true, secure: true });
}
