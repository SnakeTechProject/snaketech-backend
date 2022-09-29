import { Router } from 'express';
import { SearchController } from '../modules/search/searchController';

export const searchRouter = Router();

searchRouter.post('/', SearchController.find);
