import { Request, Response } from 'express';
import { IArticle } from '../../interfaces/articleInterface';
import { ArticleRepository } from './repositories/ArticleRepository';
import CreateArticle from './useCase/CreateArticle';

export class ArticleController {
  async create(req: Request, res: Response) {
    const { author_id, content, title } = req.body;

    const repository = new ArticleRepository();
    const createService = new CreateArticle(repository);

    await createService.execute({ author_id, content, title } as IArticle);

    return res.sendStatus(201);
  }
}
