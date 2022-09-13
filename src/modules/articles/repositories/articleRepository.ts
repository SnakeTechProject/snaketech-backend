import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IArticle {
  title: string;
  slug: string;
  content: string;
  author_id: string;
}

export class ArticleRepository {
  async create(article: IArticle) {
    return await prisma.article.create({ data: article });
  }

  async findOneById(id: number) {
    return await prisma.article.findUnique({ where: { id: id } });
  }

  async findAll() {
    return await prisma.article.findMany();
  }

  async update(id: number, data: IArticle) {
    return await prisma.article.update({
      where: { id: id },
      data: data
    });
  }

  async delete(id: number) {
    return await prisma.article.delete({ where: { id: id } });
  }
}
