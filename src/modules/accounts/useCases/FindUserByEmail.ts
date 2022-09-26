import { HttpException } from '../../../errors/HttpException';
import { UserRepository } from '../repositories/UserRepository';
import Validate from '../../../helpers/validates-parameters';

export class FindUserByEmail {
  private repository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  public async execute(email: string): Promise<object> {
    const missingData: string[] = [];

    if (!Validate.isNotEmpty(email)) {
      missingData.push('email');
    }

    if (missingData.length > 0) {
      throw new HttpException(
        400,
        `Missing required fields: ${missingData.join(', ')}`,
      );
    }

    const invalidData = [];

    if (!Validate.isString(email)) {
      invalidData.push('email: email must be a string');
    }

    if (!Validate.email(email)) {
      invalidData.push('email: invalid format');
    }

    if (invalidData.length > 0) {
      throw new HttpException(400, `Invalid fields: ${invalidData.join(', ')}`);
    }

    const user = await this.repository.findOneByEmail(email);

    if(!user) {
      throw new HttpException(400, 'user does not exist');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      articles: user.Article,
      likes: user.Likes,
    };
  }
}
