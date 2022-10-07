import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { UsersController } from '../modules/accounts/UsersController';

export const usersRouter = Router();

usersRouter.post('/', UsersController.create);

usersRouter.use(ensureAuthenticated);

usersRouter.put('/update/:id', UsersController.update);

usersRouter.delete('/delete', UsersController.delete);
