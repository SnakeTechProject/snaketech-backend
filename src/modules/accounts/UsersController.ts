import { Request, Response } from 'express';

import { CreateUser } from './useCases/CreateUser';
import { UserRepository } from './repositories/UserRepository';

export class UsersController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const repo = new UserRepository();
    const useCase = new CreateUser(repo);

    await useCase.execute(name, email, password);

    return res.sendStatus(201);
  }
}
