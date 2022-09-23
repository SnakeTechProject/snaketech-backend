import { Router } from 'express';
import { UsersController } from '../modules/accounts/UsersController';

export const usersRouter = Router();

usersRouter.post('/', UsersController.create);
