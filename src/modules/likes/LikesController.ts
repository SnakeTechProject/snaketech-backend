import { Request, Response } from 'express';

import { ArticleRepository } from '../articles/repositories/ArticleRepository';
import { LikesRepository } from '../likes/repositories/LikesRepository';

import { DefineLike, ReadLikes, DeleteLike } from './useCases/';

export class LikesController {
  static async define(req: Request, res: Response) {
    const {article_id: fk_article_id, is_liked} = req.body;
    const fk_user_id = req.user?.user_id as string;

    const articlesRepository = new ArticleRepository();
    const likesRepository = new LikesRepository();

    const createLike = new DefineLike(articlesRepository, likesRepository);

    await createLike.execute({
      fk_article_id,
      fk_user_id,
      is_liked,
    });

    return res.sendStatus(201);
  }

  static async read(req: Request, res: Response) {
    const {article_id: fk_article_id} = req.body;
    const fk_user_id = req.user?.user_id as string;

    const likesRepository = new LikesRepository();
    const readLikes = new ReadLikes(likesRepository);

    const likes = await readLikes.execute(fk_user_id, fk_article_id);

    return res.json(likes);
  }

  static async delete(req: Request, res: Response) {
    const {article_id: fk_article_id} = req.body;
    const fk_user_id = req.user?.user_id as string;

    const likesRepository = new LikesRepository();
    const deleteLike = new DeleteLike(likesRepository);

    await deleteLike.execute(fk_article_id, fk_user_id);

    return res.sendStatus(200);
  }
}
