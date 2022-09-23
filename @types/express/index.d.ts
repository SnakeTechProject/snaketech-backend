/* eslint-disable no-var */
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';

declare global {
  var prisma: PrismaClient | null;

  interface CustomRequest extends Request {
    user?: {
      user_id: string;
      permissions: string[];
    };
  }
}
