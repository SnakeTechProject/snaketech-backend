import Validate from '../../../helpers/validates-parameters';
import { HttpException } from './../../../errors/HttpException';
import { PermissionRepository } from './../repositories/PermissionRepository';

export class CreatePermission {
  private repo;

  constructor(repository: PermissionRepository) {
    this.repo = repository;
  }

  async execute(name: string, description: string) {
    if (!Validate.isNotEmpty(name)) {
      throw new HttpException(400, 'name is required');
    }

    if (!Validate.isString(name)) {
      throw new HttpException(400, 'Invalid name');
    }

    if (!Validate.isNotEmpty(description)) {
      throw new HttpException(400, 'description is required');
    }

    if (!Validate.isString(description)) {
      throw new HttpException(400, 'Invalid description');
    }

    const permissionWithName = await this.repo.findByName(name);

    if (permissionWithName) {
      throw new HttpException(400, 'Already exists a permission with this name');
    }

    const permission = await this.repo.create(name, description);

    return permission;
  }
}
