import { Router } from 'express';
import { AuthenticationController } from '../modules/accounts/AuthenticationController';

export const authenticationRouter = Router();
const authenticationController = new AuthenticationController();

authenticationRouter.post('/', authenticationController.createToken);
