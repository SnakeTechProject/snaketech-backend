import { Router } from 'express';
import { PermissionController } from '../modules/accounts/PermissionController';

export const permissionRouter = Router();

permissionRouter.post('/', PermissionController.create);
