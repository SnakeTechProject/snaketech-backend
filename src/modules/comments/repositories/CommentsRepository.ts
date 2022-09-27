import { prisma as db } from '../../../lib/prisma';
import { IComment } from '../../../interfaces/commentInterface';

export class CommentsRepository {
  async create(data: IComment) {
    await db.comment.create({ data });
  }

  async findAllByArticleId(article_id: number) {
    const comments = await db.comment.findMany({
      where: {
        article_id,
        parent_id: null,
      },
      select: {
        id: true,
        parent_id: true,
        content: true,
        created_at: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        reply: {
          select: {
            id: true,
            parent_id: true,
            content: true,
            created_at: true,
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return comments;
  }

  async findOneById(id: number) {
    const comment = await db.comment.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        author_id: true,
        parent_id: true,
      },
    });

    return comment;
  }

  async update(id: number, content: string) {
    await db.comment.update({
      where: {
        id,
      },
      data: {
        content,
      },
    });
  }

  async delete(id: number) {
    await db.comment.delete({
      where: {
        id,
      },
    });
  }
}
