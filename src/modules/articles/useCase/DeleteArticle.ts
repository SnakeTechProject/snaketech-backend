import { HttpException } from '../../../errors/HttpException';
import { ArticleRepository } from '../repositories/ArticleRepository';
import Validate from '../../../helpers/validates-parameters';

export default class DeleteArticle {
  private repository;

  constructor(repository: ArticleRepository) {
    this.repository = repository;
  }

  public async execute(id: number): Promise<void> {
    const missingData: string[] = [];
    const invalidData = [];

    if (!id) missingData.push('id');

    if (missingData.length > 0) {
      throw new HttpException(
        400,
        `Missing required fields: ${missingData.join(', ')}`,
      );
    }

    if (!Validate.isNumber(id)) invalidData.push('id must be number');

    if (invalidData.length > 0) {
      throw new HttpException(400, `Invalid fields: ${invalidData.join(', ')}`);
    }

    await this.repository.delete(id);
  }
}
