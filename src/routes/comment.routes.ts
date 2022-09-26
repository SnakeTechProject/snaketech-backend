import { Router } from 'express';
import { CommentsController } from '../modules/comments/CommentsController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const commentsRouter = Router();

commentsRouter.get('/', CommentsController.read);

commentsRouter.use(ensureAuthenticated);
commentsRouter.post('/', CommentsController.create);
commentsRouter.put('/', CommentsController.update);
commentsRouter.delete('/', CommentsController.delete);
