import { Response } from 'express';
import { UserRepository } from './repositories/UserRepository';
import { CreateUser } from './useCases/CreateUser';
import { FindUserByEmail } from './useCases/FindUserByEmail';
import { ReadUser } from './useCases/ReadUser';
import { UpdateUser } from './useCases/UpdateUser';

const repository = new UserRepository();

export class UsersController {
  static async create(req: CustomRequest, res: Response) {
    const { name, email, password } = req.body;

    const useCase = new CreateUser(repository);

    await useCase.execute(name, email, password);

    return res.sendStatus(201);
  }

  static async read(req: CustomRequest, res: Response) {
    const { id } = req.body;

    const useCase = new ReadUser(repository);

    const user = await useCase.execute(id);

    return res.status(200).json(user);
  }

  static async findByEmail(req: CustomRequest, res: Response) {
    const { email } = req.body;

    const useCase = new FindUserByEmail(repository);

    const user = await useCase.execute(email);

    return res.json(user);
  }

  static async update(req: CustomRequest, res: Response) {
    const { id } = req.params;
    const data = req.body;

    const useCase = new UpdateUser(repository);

    await useCase.execute(id, data);

    return res.sendStatus(200);
  }
}
