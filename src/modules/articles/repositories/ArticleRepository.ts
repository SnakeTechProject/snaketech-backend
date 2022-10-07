import { prisma as db } from '../../../lib/prisma';
import { IArticle, IArticleUpdate } from '../../../interfaces/articleInterface';

export class ArticleRepository {
  async create(article: IArticle) {
    return await db.article.create({
      data: article
    });
  }

  async findOneById(id: number) {
    return await db.article.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
            created_at: true,
            updated_at: true,
          }
        },
        Comment: true,
        Likes: true,
      }
    });
  }

  async findAll() {
    return await db.article.findMany({
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
            created_at: true,
            updated_at: true,
          }
        },
        Comment: true,
        Likes: true,
      }
    });
  }

  async findAllByParameters(parameters: string) {
    return await db.article.findMany({
      where: {
        OR: [
          {
            title: {
              contains: parameters
            }
          },
          {
            content: {
              contains: parameters
            }
          },
          {
            slug: {
              contains: parameters
            }
          },
          {
            author: {
              name: {
                contains: parameters
              }
            }
          }
        ]
      },
      select: {
        author: {
          select: {
            name: true,
          }
        },
        title: true,
        slug: true,
        content: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async update(id: number, data: IArticleUpdate) {
    return await db.article.update({
      where: { id },
      data: data
    });
  }

  async delete(id: number) {
    return await db.article.delete({
      where: { id }
    });
  }
}
