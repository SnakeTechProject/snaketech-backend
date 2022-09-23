import { Response } from 'express';
import { PermissionRepository } from './repositories/PermissionRepository';
import { CreatePermission } from './useCases/CreatePermission';

export class PermissionController {
  static async create(req: CustomRequest, res: Response) {
    const { name, description } = req.body;

    const permissionRepository = new PermissionRepository();
    const useCase = new CreatePermission(permissionRepository);

    await useCase.execute(name, description);

    return res.sendStatus(201);
  }
}
