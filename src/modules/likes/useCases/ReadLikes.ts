import { HttpException } from '../../../errors/HttpException';
import { ILikeQuery, ILikeResponse } from '../../../interfaces/likeInterface';
import Validate from '../../../helpers/validates-parameters';

import { LikesRepository } from '../repositories/LikesRepository';

export class ReadLikes {
  private likesRepository;
  private user_id = '';

  constructor (likesRepository: LikesRepository) {
    this.likesRepository = likesRepository;
  }

  private filterlikes(likes: Array<ILikeQuery>): ILikeResponse {
    const response: ILikeResponse = {
      like: 0,
      dislike: 0,
      user_liked: false
    };

    likes.forEach((like) => {
      const {fk_user_id: author, is_liked} = like;

      if (this.user_id && !is_liked && this.user_id === author) {
        response.user_liked = true;
      }

      if (is_liked) {
        response.like++;
      } else {
        response.dislike++;
      }
    });

    return response;
  }

  async execute(fk_user_id: string, fk_article_id: number) {
    const invalidFields: Array<string> = [];

    if (Validate.isNotEmpty(fk_user_id) && !Validate.uuid(fk_user_id)) {
      invalidFields.push('User ID is invalid');
    }

    if (!Validate.isNotEmpty(fk_article_id)) {
      invalidFields.push('Article ID is required');
    } else if (!Validate.id(fk_article_id)) {
      invalidFields.push('Article ID is invalid');
    }

    if (invalidFields.length > 0) {
      throw new HttpException(400, `Invalid fields: [${invalidFields.join(', ')}]`);
    }

    this.user_id = fk_user_id;
    const likes = await this.likesRepository.read({fk_article_id});
    const filteredLikes = this.filterlikes(likes);

    return filteredLikes;
  }
}
