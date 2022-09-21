import Validate from '../../../helpers/validates-parameters';
import { HttpException } from '../../../errors/HttpException';
import { RoleRepository } from './../repositories/RoleRepository';

export class CreateRole {
  private repo;

  constructor(repository: RoleRepository) {
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

    const roleWithName = await this.repo.findByName(name);

    if (roleWithName) {
      throw new HttpException(400, 'Already exists a permission with this name');
    }

    const role = await this.repo.create(name, description);

    return role;
  }
}
