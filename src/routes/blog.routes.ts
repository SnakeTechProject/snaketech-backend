import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ArticleController } from '../modules/articles/ArticleController';
import { canRequest } from '../middlewares/permission';

export const blogRouter = Router();

blogRouter.get('/:id', ArticleController.read);

blogRouter.get('/', ArticleController.findAll);

blogRouter.use(ensureAuthenticated);

blogRouter.post('/', canRequest('create:article'), ArticleController.create);

blogRouter.put('/:id', canRequest('update:article'), ArticleController.update);

blogRouter.delete('/:id', canRequest('delete:article'), ArticleController.delete);
