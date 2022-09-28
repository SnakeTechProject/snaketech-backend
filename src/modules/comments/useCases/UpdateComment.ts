import { HttpException } from '../../../errors/HttpException';
import Validate from '../../../helpers/validates-parameters';

import { CommentsRepository } from '../repositories/CommentsRepository';

export class UpdateComment {
  private commentsRepository;
  private contentSize = { min: 3, max: 500 };

  constructor (commentsRepository: CommentsRepository) {
    this.commentsRepository = commentsRepository;
  }

  async execute(id: number, author_id: string, content: string): Promise<void> {
    const invalidFields: Array<string> = [];
    content = content.trim();

    if (!Validate.uuid(author_id)) {
      invalidFields.push('author_id is invalid');
    }

    if (!Validate.isNotEmpty(content)) {
      invalidFields.push('content is empty');
    }

    if (!Validate.isString(content)) {
      invalidFields.push('content must be string');
    }

    if (!Validate.contentLengthLimit(content, this.contentSize)) {
      invalidFields.push('content is off limits');
    }

    if (invalidFields.length > 0) {
      throw new HttpException(400, `Invalid Field: [${invalidFields.join(', ')}]`);
    }

    const comment = await this.commentsRepository.findOneById(id);

    if (!comment) {
      throw new HttpException(404, 'comment not exists');
    }

    if (comment.author_id !== author_id) {
      throw new HttpException(403, 'YOU! don`t have permission');
    }

    await this.commentsRepository.update(id, content);

    return;
  }
}
