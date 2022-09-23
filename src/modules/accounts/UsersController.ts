import { Response } from 'express';
import { UserRepository } from './repositories/UserRepository';
import { CreateUser } from './useCases/CreateUser';
import { ReadUser } from './useCases/ReadUser';

const repository = new UserRepository();

export class UsersController {
  static async create(req: CustomRequest, res: Response) {
    const { name, email, password } = req.body;

    const useCase = new CreateUser(repository);

    await useCase.execute(name, email, password);

    return res.sendStatus(201);
  }

  static async read(req: CustomRequest, res: Response) {
    const { id } = req.params;

    const useCase = new ReadUser(repository);

    const user = await useCase.execute(id);

    return res.status(200).json(user);
  }
}
