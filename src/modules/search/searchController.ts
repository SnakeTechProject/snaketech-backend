import { Request, Response } from 'express';
import { ArticleRepository } from '../articles/repositories/ArticleRepository';
import { FindArticles } from './useCases/FindArticles';

const repository = new ArticleRepository();

export class SearchController {
  static async find(req: Request, res: Response) {
    const { parameters } = req.body;

    const useCase = new FindArticles(repository);

    const articles = await useCase.execute(parameters);

    return res.status(200).json(articles);
  }
}
