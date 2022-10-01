import { Response, NextFunction, Request } from 'express';
import { verify } from 'jsonwebtoken';

import { jwt_secret } from '../config/vars';
import { HttpException } from './../errors/HttpException';

export const optionalAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next();
  }

  const token = authHeader?.split(' ')[1] as string;

  try {
    const payload = <{ user_id: string, permissions: string[] }>verify(token, jwt_secret);

    if (payload.user_id) {
      req.user = {
        user_id: payload.user_id,
        permissions: payload.permissions
      };
    }

    return next();
  } catch {
    throw new HttpException(401, 'Invalid token');
  }
};
