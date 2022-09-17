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
        author: true,
        Comment: true,
        Likes: true,
      }
    });
  }

  async findAll() {
    return await db.article.findMany({
      include: {
        author: true,
        Comment: true,
        Likes: true,
      }
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
