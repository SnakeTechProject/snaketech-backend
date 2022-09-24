/* eslint-disable no-var */
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;

  declare namespace Express {
    export interface Request {
      user?: {
        user_id: string;
        permissions: string[];
      }
    }
  }
}
