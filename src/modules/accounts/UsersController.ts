import { Response } from 'express';

import { CreateUser } from './useCases/CreateUser';
import { UserRepository } from './repositories/UserRepository';

const repository = new UserRepository();

export class UsersController {
  static async create(req: CustomRequest, res: Response) {
    const { name, email, password } = req.body;

    const useCase = new CreateUser(repository);

    await useCase.execute(name, email, password);

    return res.sendStatus(201);
  }
}
