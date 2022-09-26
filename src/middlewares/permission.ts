import { HttpException } from './../errors/HttpException';
import { Request, Response, NextFunction } from 'express';

const availableFeatures = [
  // Account
  'create:account',
  'read:account',
  'read:account:list',
  'update:account',
  'delete:account',

  // Comment
  'create:comment',
  'read:comment',
  'update:comment',
  'update:comment:others',
  'delete:comment',

  // Challenge
  'create:challenge',
  'read:challenge',
  'update:challenge',
  'delete:challenge',

  // Article
  'create:article',
  'read:article',
  'update:article',
  'delete:article',
] as const;

type AvailableFeatures = typeof availableFeatures[number];

/**
 * Middleware that only allow users that have the given permissions to access the next function:
 *
 * @example
 * // You can pass one permission
 * router.delete('/user', canRequest('delete:user'), deleteUser)
 *
 * // You can pass many permissions, the user must have all of them
 * router.put('/user', canRequest('read:account', 'update:account'), updateAccount)
 *
 * @param permissions
 */

export const canRequest = (...permissions: AvailableFeatures[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      throw new Error(
        'You must use the "ensureAuthenticated" Middleware before using "canRequest"',
      );
    }

    permissions.forEach((permission) => {
      if (!user?.permissions.includes(permission)) {
        throw new HttpException(
          403,
          `You don't have permission to ${permission}`,
        );
      }
    });

    return next();
  };
};
