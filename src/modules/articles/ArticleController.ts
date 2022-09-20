import { NextFunction, Request, Response } from 'express';
import { IArticle } from '../../interfaces/articleInterface';
import { ArticleRepository } from './repositories/ArticleRepository';
import CreateArticle from './useCase/CreateArticle';

export class ArticleController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { author_id, content, title } = req.body;

    const repository = new ArticleRepository();
    const createService = new CreateArticle(repository);

    try {
      await createService.execute({ author_id, content, title } as IArticle);

      return res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  }
}
