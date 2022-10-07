import { HttpException } from '../../../errors/HttpException';
import Validate from '../../../helpers/validates-parameters';

import { LikesRepository } from '../repositories/LikesRepository';

export class DeleteLike {
  private likesRepository;

  constructor(likesRepository: LikesRepository) {
    this.likesRepository = likesRepository;
  }

  async execute(fk_article_id: number, fk_user_id: string): Promise<void> {
    const invalidFields: Array<string> = [];

    if (!Validate.id(fk_article_id)) {
      invalidFields.push('id is invalid');
    }

    if (!Validate.uuid(fk_user_id)) {
      invalidFields.push('author_id is invalid');
    }

    if (invalidFields.length > 0) {
      throw new HttpException(400, `Invalid field: [${invalidFields.join(', ')}]`);
    }

    if (!(await this.likesRepository.findOne({ fk_article_id, fk_user_id }))) {
      throw new HttpException(400, 'User not liked');
    }

    await this.likesRepository.delete({ fk_article_id, fk_user_id });

    return;
  }
}
