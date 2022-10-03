import { Router } from 'express';
import { CommentsController } from '../modules/comments/CommentsController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { optionalAuthenticated } from '../middlewares/optionalAuthenticated';

export const commentsRouter = Router();

commentsRouter.get('/', optionalAuthenticated, CommentsController.read);

commentsRouter.use(ensureAuthenticated);
commentsRouter.post('/', CommentsController.create);
commentsRouter.put('/', CommentsController.update);
commentsRouter.delete('/', CommentsController.delete);
