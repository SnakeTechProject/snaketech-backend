import { HttpException } from '../../../errors/HttpException';
import Validate from '../../../helpers/validates-parameters';

import { CommentsRepository } from '../repositories/CommentsRepository';

export class DeleteComments {
  private commentsRepository;

  constructor (commentsRepository: CommentsRepository) {
    this.commentsRepository = commentsRepository;
  }

  async execute(id: number, author_id: string): Promise<void> {
    const invalidFields: Array<string> = [];

    if (!Validate.id(id)) {
      invalidFields.push('id is invalid');
    }

    if (!Validate.uuid(author_id)) {
      invalidFields.push('author_id is invalid');
    }

    if (invalidFields.length > 0) {
      throw new HttpException(400, `Invalid field: [${invalidFields.join(', ')}]`);
    }

    const comment = await this.commentsRepository.findOneById(id);

    if (!comment) {
      throw new HttpException(404, 'comment not exists');
    }

    if (comment.author_id !== author_id) {
      throw new HttpException(403, 'YOU! don`t have permission');
    }

    await this.commentsRepository.delete(id);

    return;
  }
}
