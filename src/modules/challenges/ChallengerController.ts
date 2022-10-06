import { Request, Response } from 'express';

import { ChanllengeRepository } from './repositories/ChallengeRepository';
import { UserRepository } from '../accounts/repositories/UserRepository';
import { CreateChallenge, DeleteChallenge, FindAllChallenges, ReadChallenge, UpdateChallenge } from './useCases';
import { IChallenge } from '../../interfaces/challengeInterface';

const challengeRepository = new ChanllengeRepository();

export class ChallengeController {
  static async create(req: Request, res: Response) {

    const { title, description, difficulty } = req.body;
    const author_id = req.user?.user_id;

    const userRepository = new UserRepository();
    const useCase = new CreateChallenge(challengeRepository, userRepository);

    await useCase.execute({
      author_id,
      title,
      description,
      difficulty,
    } as IChallenge);

    return res.sendStatus(201);
  }

  static async read(req: Request, res: Response) {
    const { id } = req.body;

    const useCase = new ReadChallenge(challengeRepository);

    const challenge = await useCase.execute(id);

    return res.status(200).json(challenge);
  }

  static async findAll(req: Request, res: Response) {
    const useCase = new FindAllChallenges(challengeRepository);

    const challenges = await useCase.execute();

    return res.status(200).json(challenges);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.body;
    const data = req.body;

    const useCase = new UpdateChallenge(challengeRepository);

    await useCase.execute(id, data);

    return res.sendStatus(200);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.body;

    const useCase = new DeleteChallenge(challengeRepository);

    await useCase.execute(id);

    return res.sendStatus(200);
  }
}
