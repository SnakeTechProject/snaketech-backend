import { HttpException } from '../../../errors/HttpException';
import { IArticle } from '../../../interfaces/articleInterface';
import { ArticleRepository } from '../repositories/ArticleRepository';
import Validate from '../../../helpers/validates-parameters';
import urlSlug from 'url-slug';

export default class CreateArticle {
  private repository;

  constructor(repository: ArticleRepository) {
    this.repository = repository;
  }

  public async execute({ author_id, content, title }: IArticle): Promise<void> {
    const missingData: string[] = [];
    const invalidData = [];
    const slug = urlSlug(title);

    if (!title) missingData.push('title');

    if (!content) missingData.push('content');

    if (!author_id) missingData.push('author_id');

    if (missingData.length > 0) {
      throw new HttpException(
        400,
        `Missing required fields: ${missingData.join(', ')}`,
      );
    }

    if (!Validate.isString(title))
      invalidData.push('title: title must be string');

    if (!Validate.isString(content))
      invalidData.push('content: content must be string');

    if (!Validate.isString(author_id))
      invalidData.push('author_id: author_id must be string');

    if (invalidData.length > 0) {
      throw new HttpException(400, `Invalid fields: ${invalidData.join(', ')}`);
    }

    await this.repository.create({
      author_id,
      content,
      slug,
      title,
    });
  }
}
