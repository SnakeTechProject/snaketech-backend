import { HttpException } from './../errors/HttpException';
import { Response, NextFunction } from 'express';

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

export const canRequest = (feature: AvailableFeatures) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user?.features.includes(feature)) {
      throw new HttpException(403, `You don't have permission to ${feature}`);
    }

    return next();
  };
};
