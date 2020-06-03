import { Request, Response } from 'express';

import UserManager, {
  DoesNotExistError,
  AlreadyExistsError,
} from '../../db/managers/UserManager';
import * as httpstatus from '../statuscodes';
import User from '../../db/entity/User';
import {
  createToken,
  errorResponse,
  successResponse,
  comparePassword,
  hashPassword,
} from '../helpers';

export async function login(req: Request, res: Response) {
  const userManager = new UserManager();
  const { email, password } = req.body;
  try {
    const user = await userManager.getUserByEmail(email);

    if (!comparePassword(password, user.password)) {
      return errorResponse(res, {
        message: 'Incorrect credentials',
        code: httpstatus.STATUS_BAD_REQUEST,
      });
    }

    const token = createToken({ id: user.userId });
    res.header('X-Token', token);
    res.cookie('X-Token', token);
    successResponse(res, user);
  } catch (err) {
    if (err instanceof DoesNotExistError) {
      return errorResponse(res, {
        message: 'Its seems this user does not exist',
        code: httpstatus.STATUS_NOT_FOUND,
      });
    }

    return errorResponse(res, {
      message: 'Something weird happened, its not from you.',
      code: httpstatus.STATUS_INTERNAL_SERVER_ERROR,
      details: err,
    });
  }
}

export async function signup(req: Request, res: Response) {
  const userManager = new UserManager();
  try {
    const user = <User>req.body;
    user.password = hashPassword(user.password);
    const newUser = await userManager.createUser(user);

    const token = createToken({ id: newUser.userId });
    res.header('X-Token', token);
    res.cookie('X-Token', token);

    successResponse(res, newUser);
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
      details: err.stack,
    });
  }
}
