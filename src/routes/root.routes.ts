import { Router, Request, Response } from 'express';
import { ArticleController } from '../modules/articles/ArticleController';

export const rootRouter = Router();

const articleController = new ArticleController();

rootRouter.post('/blog', (req: Request, res: Response) => {
  articleController.create(req, res);
});

rootRouter.use('/', (req: Request, res: Response) => {
  res.send('SnakeTech Api');
});
