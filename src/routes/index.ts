import { Router } from 'express';
import { authenticationRouter } from './authentication.routes';
import { blogRouter } from './blog.routes';
import { permissionRouter } from './permission.routes';
import { rolesRouter } from './roles.routes';
import { rootRouter } from './root.routes';
import { usersRouter } from './users.routes';
import { commentsRouter } from './comment.routes';
import { challengeRouter } from './challenges.routes';

export const routes = Router();

routes.use('/blog', blogRouter);
routes.use('/users', usersRouter);
routes.use('/comments', commentsRouter);
routes.use('/challenges', challengeRouter);
routes.use('/sessions', authenticationRouter);
routes.use('/roles', rolesRouter);
routes.use('/permissions', permissionRouter);
routes.use('/', rootRouter);
