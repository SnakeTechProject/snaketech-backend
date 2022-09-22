import { HttpException } from '../../../errors/HttpException';
import { UserRepository } from '../repositories/UserRepository';
import Validate from '../../../helpers/validates-parameters';

export class DeleteUser {
  private repository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  public async execute(id: string): Promise<void> {
    const missingData: string[] = [];

    if (!Validate.isNotEmpty(id)) {
      missingData.push('id');
    }


    if (missingData.length > 0) {
      throw new HttpException(
        400,
        `Missing required fields: ${missingData.join(', ')}`,
      );
    }

    const invalidData = [];

    if (!Validate.isString(id)) {
      invalidData.push('id: id must be a string');
    }

    if (invalidData.length > 0) {
      throw new HttpException(400, `Invalid fields: ${invalidData.join(', ')}`);
    }

    const user = await this.repository.findOneById(id);

    if(!user) {
      throw new HttpException(400, 'user does not exist');
    }

    await this.repository.delete(id);
  }
}
