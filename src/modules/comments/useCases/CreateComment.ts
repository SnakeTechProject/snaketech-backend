import { HttpException } from '../../../errors/HttpException';
import Validate from '../../../helpers/validates-parameters';
import { IComment } from '../../../interfaces/commentInterface';

import { CommentsRepository } from '../repositories/CommentsRepository';
import { ArticleRepository } from '../../articles/repositories/ArticleRepository';

export class CreateComment {
  private commentsRepository;
  private articlesRepository;
  private contentSize = { min: 3, max: 500 };

  constructor (commentsRepository: CommentsRepository, articlesRepository: ArticleRepository) {
    this.commentsRepository = commentsRepository;
    this.articlesRepository = articlesRepository;
  }

  async execute({article_id, author_id, parent_id, content}: IComment): Promise<void> {
    const invalidFields: Array<string> = [];

    if (!Validate.id(article_id)) {
      invalidFields.push('article_id is invalid');
    }

    if (!Validate.uuid(author_id)) {
      invalidFields.push('author_id is invalid');
    }

    if (Validate.isNotEmpty(parent_id) && !Validate.id(parent_id)) {
      invalidFields.push('parent_id is invalid');
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
      throw new HttpException(400, `Invalid field: [${invalidFields.join('; ')}]`);
    }

    if (!(await this.articlesRepository.findOneById(article_id))) {
      throw new HttpException(404, 'Article not exists');
    }

    if (Validate.isNotEmpty(parent_id) && !(await this.commentsRepository.findOneById(parent_id))) {
      throw new HttpException(404, 'parent_id not exists');
    }

    await this.commentsRepository.create({content, author_id, article_id, parent_id});

    return;
  }
}
