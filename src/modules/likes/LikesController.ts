import { Request, Response } from 'express';

import { ArticleRepository } from '../articles/repositories/ArticleRepository';
import { LikesRepository } from '../likes/repositories/LikesRepository';

import { CreateLike } from './useCases/';

export class LikesController {
  static async create(req: Request, res: Response) {
    const {article_id: fk_article_id, is_liked} = req.body;
    const fk_user_id = req.user?.user_id as string;

    const articlesRepository = new ArticleRepository();
    const likesRepository = new LikesRepository();

    const createLike = new CreateLike(articlesRepository, likesRepository);

    await createLike.execute({
      fk_article_id,
      fk_user_id,
      is_liked,
    });

    return res.sendStatus(201);
  }
}
