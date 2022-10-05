import { Request, Response } from 'express';
import { ArticleRepository } from '../articles/repositories/ArticleRepository';
import { ChanllengeRepository } from '../challenges/repositories/ChallengeRepository';
import { FindArticles } from './useCases/FindArticles';
import { FindChallenges } from './useCases/FindChallenges';

const articleRepository = new ArticleRepository();
const challengeRepository = new ChanllengeRepository();

export class SearchController {
  static async find(req: Request, res: Response) {
    const { parameters } = req.body;

    const useCaseArticles = new FindArticles(articleRepository);
    const useCaseChallenges = new FindChallenges(challengeRepository);

    const articles = await useCaseArticles.execute(parameters);
    const challenges = await useCaseChallenges.execute(parameters);

    return res.status(200).json({
      articles,
      challenges
    });
  }
}
