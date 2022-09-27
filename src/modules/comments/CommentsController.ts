import { Request, Response } from 'express';

import { ArticleRepository } from '../articles/repositories/ArticleRepository';
import { CommentsRepository } from './repositories/CommentsRepository';

import { CreateComment, ReadComments, UpdateComment, DeleteComments } from './useCases/';

export class CommentsController {
  static async create(req: Request, res: Response) {
    const { article_id, parent_id, content } = req.body;
    const author_id = req.user?.user_id as string;

    const commentsRepository = new CommentsRepository();
    const articlesRepository = new ArticleRepository();

    const createComment = new CreateComment(commentsRepository, articlesRepository);

    await createComment.execute({
      content,
      author_id,
      article_id,
      parent_id,
    });

    return res.sendStatus(201);
  }

  static async read(req: Request, res: Response) {
    const { article_id } = req.body;
    const author_id = req.user?.user_id as string;

    const commentsRepository = new CommentsRepository();
    const articlesRepository = new ArticleRepository();
    const readComments = new ReadComments(commentsRepository, articlesRepository);
    const comments = await readComments.execute(article_id, author_id);

    return res.status(200).json(comments);
  }

  static async update(req: Request, res: Response) {
    const { id, content } = req.body;
    const author_id = req.user?.user_id as string;

    const commentsRepository = new CommentsRepository();
    const updateComment = new UpdateComment(commentsRepository);

    await updateComment.execute(id, author_id, content);

    return res.sendStatus(200);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.body;
    const author_id = req.user?.user_id as string;

    const commentsRepository = new CommentsRepository();
    const deleteComments = new DeleteComments(commentsRepository);

    await deleteComments.execute(id, author_id);

    return res.sendStatus(200);
  }
}
