import { ArticleRepository } from '../repositories/ArticleRepository';

export default class FindAllArticles {
  private repository;

  constructor(repository: ArticleRepository) {
    this.repository = repository;
  }

  public async execute(): Promise<object> {
    const articles = await this.repository.findAll();

    return articles.map((article) => {
      return {
        id: article?.id,
        content: article?.content,
        title: article?.title,
        slug: article?.slug,
      };
    });
  }
}
