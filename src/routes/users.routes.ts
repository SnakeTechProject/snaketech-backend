import { Router } from 'express';
import { UsersController } from '../modules/accounts/UsersController';

export const usersRouter = Router();

usersRouter.post('/', UsersController.create);

usersRouter.get('/find-by-id', UsersController.read);

usersRouter.get('/find-by-email', UsersController.findByEmail);

usersRouter.put('/update/:id', UsersController.update);

usersRouter.delete('/delete-by-id', UsersController.delete);
