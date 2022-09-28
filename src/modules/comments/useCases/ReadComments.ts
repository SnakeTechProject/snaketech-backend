import { HttpException } from '../../../errors/HttpException';
import Validate from '../../../helpers/validates-parameters';

import { CommentsRepository } from '../repositories/CommentsRepository';
import { ArticleRepository } from '../../articles/repositories/ArticleRepository';

import { ICommentSchema } from '../../../interfaces/commentInterface';

export class ReadComments {
  private articleRepository;
  private commentsRepository;
  private author_id = '';

  constructor (commentsRepository: CommentsRepository, articlesRepository: ArticleRepository) {
    this.commentsRepository = commentsRepository;
    this.articleRepository = articlesRepository;
  }

  private filterAuthor(comments: Array<ICommentSchema>): Array<object> {
    comments.map((comment) => {
      const {author, reply} = comment;

      if (reply && reply.length > 0) this.filterAuthor(reply);

      comment.author.type = (this.author_id && this.author_id === author.id) ? 'user' : 'anonymous';

      delete comment.author.id;

      return comment;
    });

    return comments;
  }

  async execute(article_id: number, author_id: string): Promise<object> {
    const invalidFields: Array<string> = [];

    if (!Validate.id(article_id)) {
      invalidFields.push('article_id is invalid');
    }

    if (Validate.isNotEmpty(author_id) && !Validate.uuid(author_id)) {
      invalidFields.push('author_id is invalid');
    }

    if (invalidFields.length > 0) {
      throw new HttpException(400, `Invalid fields: [${invalidFields.join(', ')}]`);
    }

    const article = await this.articleRepository.findOneById(article_id);
    this.author_id = author_id;

    if (!(article)) {
      throw new HttpException(404, 'Article not exists');
    }

    const comments = await this.commentsRepository.findAllByArticleId(article_id);

    const filteredComments = this.filterAuthor(comments);

    return filteredComments;
  }
}
