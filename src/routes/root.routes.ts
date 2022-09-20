import { Router, Request, Response, NextFunction } from 'express';
import { ArticleController } from '../modules/articles/ArticleController';

export const rootRouter = Router();

const articleController = new ArticleController();

rootRouter.post('/blog', (req: Request, res: Response, next: NextFunction) => {
  articleController.create(req, res, next);
});

rootRouter.use('/', (req: Request, res: Response) => {
  res.send('SnakeTech Api');
});
