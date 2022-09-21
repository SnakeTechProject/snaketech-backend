import { Router } from 'express';
import { ArticleController } from '../modules/articles/ArticleController';

export const blogRouter = Router();
const articleController = new ArticleController();

blogRouter.get('/:id', articleController.read);

blogRouter.get('/', articleController.findAll);

blogRouter.post('/', articleController.create);

blogRouter.put('/:id', ArticleController.update);

blogRouter.delete('/:id', ArticleController.delete);
