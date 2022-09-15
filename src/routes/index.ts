import { Router } from 'express';
import { rootRouter } from './root.routes';
import { usersRouter } from './users.routes';

export const routes = Router();

routes.use('/users', usersRouter);
routes.use('/', rootRouter);
