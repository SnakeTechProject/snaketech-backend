import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { jwt_secret } from '../config/vars';
import { HttpException } from './../errors/HttpException';

export const ensureAuthenticated = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new HttpException(400, 'Missing auth header');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = <{ user_id: string }>verify(token, jwt_secret);

    req.user = {
      user_id: payload.user_id,
    };

    next();
  } catch {
    throw new HttpException(401, 'Invalid token');
  }
};
