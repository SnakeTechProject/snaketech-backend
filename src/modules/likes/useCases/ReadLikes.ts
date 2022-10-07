import { HttpException } from '../../../errors/HttpException';
import { ILike } from '../../../interfaces/likeInterface';
import Validate from '../../../helpers/validates-parameters';

import { LikesRepository } from '../repositories/LikesRepository';
import { ArticleRepository } from '../../articles/repositories/ArticleRepository';

export class ReadLikes {
  private articlesRepository;
  private likesRepository;
  private user_id = '';

  constructor (articlesRepository: ArticleRepository, likesRepository: LikesRepository) {
    this.articlesRepository = articlesRepository;
    this.likesRepository = likesRepository;
  }

  async execute({fk_user_id}: ILike) {

  }
}
