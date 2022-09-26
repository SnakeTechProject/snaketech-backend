import { Router } from 'express';
import { UsersController } from '../modules/accounts/UsersController';

export const usersRouter = Router();

usersRouter.post('/', UsersController.create);

usersRouter.put('/update/:id', UsersController.update);

usersRouter.delete('/delete', UsersController.delete);
