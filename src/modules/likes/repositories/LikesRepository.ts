import { prisma as db } from '../../../lib/prisma';
import {
  ILike,
  ILikeQuery,
  ILikeDelete,
} from '../../../interfaces/likeInterface';

export class LikesRepository {
  async define({ fk_article_id, fk_user_id, is_liked }: ILike): Promise<void> {
    await db.like.upsert({
      where: {
        fk_user_id_fk_article_id: {
          fk_article_id,
          fk_user_id,
        },
      },
      update: {
        is_liked,
      },
      create: {
        fk_article_id,
        fk_user_id,
        is_liked,
      },
    });
  }

  async read({ fk_article_id }: ILikeQuery) {
    const likes = await db.like.findMany({
      where: {
        OR: [
          {
            fk_article_id,
          },
        ],
      },
    });

    return likes;
  }

  async findOne({ fk_article_id, fk_user_id }: ILikeQuery) {
    const like = await db.like.findFirst({
      where: {
        OR: [
          {
            fk_article_id,
            fk_user_id,
          },
        ],
      },
    });

    return like;
  }

  async delete({ fk_article_id, fk_user_id }: ILikeDelete): Promise<void> {
    await db.like.delete({
      where: {
        fk_user_id_fk_article_id: {
          fk_article_id,
          fk_user_id,
        },
      },
    });
  }
}
