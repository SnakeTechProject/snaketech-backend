import { Router } from 'express';
import { ArticleController } from '../modules/articles/ArticleController';

export const blogRouter = Router();

blogRouter.get('/:id', ArticleController.read);

blogRouter.get('/', ArticleController.findAll);

blogRouter.post('/', ArticleController.create);

blogRouter.put('/:id', ArticleController.update);

blogRouter.delete('/:id', ArticleController.delete);
