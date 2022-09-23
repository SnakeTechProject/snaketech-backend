import { HttpException } from '../../../errors/HttpException';
import Validate from '../../../helpers/validates-parameters';

import { CommentsRepository } from '../repositories/CommentsRepository';
import { ArticleRepository } from '../../articles/repositories/ArticleRepository';

export class ReadComments {
  private articleRepository;
  private commentsRepository;

  constructor (commentsRepository: CommentsRepository, articlesRepository: ArticleRepository) {
    this.commentsRepository = commentsRepository;
    this.articleRepository = articlesRepository;
  }

  async execute(article_id: number): Promise<object> {

    if (!Validate.id(article_id)) {
      throw new HttpException(400, 'article_id is invalid');
    }

    const article = await this.articleRepository.findOneById(article_id);

    if (!(article)) {
      throw new HttpException(400, 'Article not exists');
    }

    const comments = await this.commentsRepository.findAllByArticleId(article_id);

    return comments;
  }
}
