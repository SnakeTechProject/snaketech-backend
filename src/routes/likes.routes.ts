import { Router } from 'express';
import { LikesController } from '../modules/likes/LikesController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { optionalAuthenticated } from '../middlewares/optionalAuthenticated';

export const likesRouter = Router();

likesRouter.get('/', optionalAuthenticated, LikesController.read);

likesRouter.use(ensureAuthenticated);
likesRouter.post('/', LikesController.define);
likesRouter.put('/', LikesController.define);
likesRouter.delete('/', LikesController.delete);
