import { HttpException } from '../../../errors/HttpException';
import { ILike } from '../../../interfaces/likeInterface';
import Validate from '../../../helpers/validates-parameters';

import { LikesRepository } from '../repositories/LikesRepository';
import { ArticleRepository } from '../../articles/repositories/ArticleRepository';

export class DefineLike {
  private articlesRepository;
  private likesRepository;

  constructor (articlesRepository: ArticleRepository, likesRepository: LikesRepository) {
    this.articlesRepository = articlesRepository;
    this.likesRepository = likesRepository;
  }

  async execute({fk_user_id, fk_article_id, is_liked}: ILike) {
    const invalidFields: Array<string> = [];

    if (!Validate.id(fk_article_id)) {
      invalidFields.push('article_id is invalid');
    }

    if (!Validate.uuid(fk_user_id)) {
      invalidFields.push('user_id is invalid');
    }

    if (invalidFields.length > 0) {
      throw new HttpException(400, `Invalid fields: [${invalidFields.join(', ')}]`);
    }

    if (!(await this.articlesRepository.findOneById(fk_article_id))) {
      throw new HttpException(404, 'Article not existis');
    }

    await this.likesRepository.define({
      fk_article_id,
      fk_user_id,
      is_liked
    });

    return;
  }
}
