import { HttpException } from '../../../errors/HttpException';
import { ArticleRepository } from '../repositories/ArticleRepository';
import Validate from '../../../helpers/validates-parameters';

export default class ReadArticle {
  private repository;

  constructor(repository: ArticleRepository) {
    this.repository = repository;
  }

  public async execute(id: number): Promise<object> {
    const missingData: string[] = [];
    const invalidData = [];

    if (!id) missingData.push('id');

    if (missingData.length > 0) {
      throw new HttpException(
        400,
        `Missing required fields: ${missingData.join(', ')}`,
      );
    }

    if (!Validate.isNumber(id)) invalidData.push('id: id must be number');

    if (invalidData.length > 0) {
      throw new HttpException(400, `Invalid fields: ${invalidData.join(', ')}`);
    }

    if (!(await this.repository.findOneById(id))) {
      throw new HttpException(404, 'Article not found');
    }

    const article = await this.repository.findOneById(id);

    return {
      article: {
        id: article?.id,
        content: article?.content,
        slug: article?.slug,
        title: article?.title,
      },
    };
  }
}
