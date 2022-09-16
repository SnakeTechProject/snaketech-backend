export interface IComment {
  content: string;
  author_id: string;
  article_id: number;
  parent_id: number;
}

export interface ICommentUpdate {
  content?: string;
}
