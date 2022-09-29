import { HttpException } from '../../../errors/HttpException';
import { ArticleRepository } from '../../articles/repositories/ArticleRepository';
import Validate from '../../../helpers/validates-parameters';

export class FindArticles {
  private repository;

  constructor(repository: ArticleRepository) {
    this.repository = repository;
  }

  public async execute(parameters: string): Promise<object> {
    const missingData: string[] = [];

    if (!Validate.isNotEmpty(parameters)) {
      missingData.push('parameters');
    }

    if (missingData.length > 0) {
      throw new HttpException(
        400,
        `Missing required fields: ${missingData.join(', ')}`,
      );
    }

    const invalidData = [];

    if (!Validate.isString(parameters)) {
      invalidData.push('parameters: parameters must be a string');
    }

    if (parameters.length < 3) {
      invalidData.push('parameters: parameters length invalid');
    }

    if (invalidData.length > 0) {
      throw new HttpException(400, `Invalid fields: ${invalidData.join(', ')}`);
    }

    const articles = await this.repository.findAllByParameters(parameters);

    if(articles.length === 0) {
      throw new HttpException(404, 'not found');
    }

    return articles;
  }
}
