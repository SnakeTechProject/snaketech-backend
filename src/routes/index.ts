import { Router } from 'express';
import { authenticationRouter } from './authentication.routes';
import { blogRouter } from './blog.routes';
import { rootRouter } from './root.routes';
import { usersRouter } from './users.routes';

export const routes = Router();

routes.use('/blog', blogRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', authenticationRouter);
routes.use('/', rootRouter);
