import { prisma as db, IComment } from '../../../lib/prisma';

export class CommentsRepository {
  async create({author_id, article_id, parent_id, content, created_at }: IComment) {
    await db.comment.create({
      data: {
        content,
        author_id,
        article_id,
        parent_id,
        created_at
      },
    });
  }

  async findAllByArticleId(article_id: number) {
    const comments = await db.comment.findMany({
      where: {
        article_id,
      },
      select: {
        id: true,
        author_id: true,
        parent_id: true,
        content: true,
        created_at: true,
        reply: {
          select: {
            id: true,
            author_id: true,
            parent_id: true,
            content: true,
            created_at: true,
          }
        }
      }
    });

    return comments;
  }

  async update({id, content}: IComment) {
    await db.comment.update({
      where: {
        id,
      },
      data: {
        content,
      },
    });
  }

  async delete(id: number){
    await db.comment.delete({
      where: {
        id,
      },
    });
  }
}
