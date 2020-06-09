import { NextFunction, Request, Response } from 'express';

import { decodeToken, verifyToken, errorResponse } from '../helpers';
import { STATUS_UNAUTHORIZED } from '../statuscodes';

export function withAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token: string;
  try {
    token = getCookie(req.headers.cookie, 'X-Token');
    verifyToken(token);
  } catch (err) {
    return errorResponse(res, {
      message: 'User authentication failed',
      code: STATUS_UNAUTHORIZED,
      error: err.stack,
    });
  }

  if (token) {
    req.headers['userId'] = decodeToken(token)['id'];
  }
  next();
}

function getCookie(cookies: string, key: string): string | undefined {
  const cookieMap = new Map();
  cookies.split(';').map(cookie => {
    const [key, value] = cookie.trim().split('=');
    cookieMap.set(key, value);
  });
  return cookieMap.get(key);
}
