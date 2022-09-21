import { NextFunction, Request, Response } from 'express';
import { IArticle } from '../../interfaces/articleInterface';
import { ArticleRepository } from './repositories/ArticleRepository';
import CreateArticle from './useCase/CreateArticle';
import DeleteArticle from './useCase/DeleteArticle';
import FindAllArticles from './useCase/FindAllArticles';
import ReadArticle from './useCase/ReadArticle';
import UpdateArticle from './useCase/UpdateArticle';

const repository = new ArticleRepository();
export class ArticleController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { author_id, content, title } = req.body;

    const createArticle = new CreateArticle(repository);

    try {
      await createArticle.execute({ author_id, content, title } as IArticle);
      return res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);

    const readArticle = new ReadArticle(repository);

    try {
      const response = await readArticle.execute(id);
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response) {
    const findAllArticles = new FindAllArticles(repository);

    const response = await findAllArticles.execute();
    return res.json(response);
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    const { content, title } = req.body;

    const updateArticle = new UpdateArticle(repository);

    try {
      await updateArticle.execute(id, { content, title });
      return res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);

    const deleteArticle = new DeleteArticle(repository);

    try {
      await deleteArticle.execute(id);
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}
