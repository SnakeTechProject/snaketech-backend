import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ChallengeController } from '../modules/challenges/challengerController';

export const challengeRouter = Router();

challengeRouter.use(ensureAuthenticated);

challengeRouter.post('/', ChallengeController.create);

challengeRouter.get('/read', ChallengeController.read);

challengeRouter.get('/', ChallengeController.findAll);

challengeRouter.put('/update', ChallengeController.update);

challengeRouter.delete('/delete', ChallengeController.delete);
