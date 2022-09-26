import { Request, Response } from 'express';
import { RoleRepository } from './repositories/RoleRepository';
import { CreateRole } from './useCases/CreateRole';

export class RoleController {
  static async create(req: Request, res: Response) {
    const { name, description } = req.body;

    const roleRepository = new RoleRepository();
    const useCase = new CreateRole(roleRepository);

    await useCase.execute(name, description);

    return res.sendStatus(201);
  }
}
