import { HttpException } from '../../../errors/HttpException';
import { IArticleUpdate } from '../../../interfaces/articleInterface';
import { ArticleRepository } from '../repositories/ArticleRepository';
import Validate from '../../../helpers/validates-parameters';
import urlSlug from 'url-slug';

export default class UpdateArticle {
  private repository;

  constructor(repository: ArticleRepository) {
    this.repository = repository;
  }

  public async execute(
    id: number,
    { content, title }: IArticleUpdate,
  ): Promise<void> {
    const invalidData = [];

    if (!Validate.isString(title as string))
      invalidData.push('title must be string');

    if (!Validate.isString(content as string))
      invalidData.push('content must be string');

    if (invalidData.length > 0) {
      throw new HttpException(400, `Invalid fields: ${invalidData.join(', ')}`);
    }

    if (!(await this.repository.findOneById(id))) {
      throw new HttpException(404, 'Article not found');
    }

    const slug = urlSlug(title as string);

    await this.repository.update(id, {
      content,
      title,
      slug,
    } as IArticleUpdate);
  }
}
