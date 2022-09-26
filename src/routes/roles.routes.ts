import { Router } from 'express';
import { RoleController } from '../modules/accounts/RoleController';

export const rolesRouter = Router();

rolesRouter.post('/', RoleController.create);
