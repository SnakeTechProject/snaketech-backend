import { env } from '../config/vars';
import { PrismaClient } from '@prisma/client';

export {
  Article as IArticle,
  Comment as IComment,
  Like as ILike,
  User as IUser,
} from '@prisma/client';

export let prisma: PrismaClient;

if (env === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  prisma = global.prisma;
}
