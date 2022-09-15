import { Router } from 'express';
import { UsersController } from '../modules/accounts/UsersController';

export const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create);
