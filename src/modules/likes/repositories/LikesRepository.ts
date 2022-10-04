import { prisma } from '../../../lib/prisma';
import { ILike } from '../../../interfaces/likeInterface';

export class Likes {
  async create(data: ILike): Promise<void> {
    await prisma.like.create({ data });
  }
}
