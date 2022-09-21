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
    const missingData: string[] = [];
    const invalidData = [];

    if (!title) missingData.push('title');

    if (!content) missingData.push('content');

    if (missingData.length > 0) {
      throw new HttpException(
        400,
        `Missing required fields: ${missingData.join(', ')}`,
      );
    }

    if (!Validate.isString(title as string))
      invalidData.push('title must be string');

    if (!Validate.isString(content as string))
      invalidData.push('content must be string');

    if (invalidData.length > 0) {
      throw new HttpException(400, `Invalid fields: ${invalidData.join(', ')}`);
    }

    const slug = urlSlug(title as string);

    await this.repository.update(id, {
      content,
      title,
      slug,
    } as IArticleUpdate);
  }
}
