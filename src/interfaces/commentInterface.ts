export interface IComment {
  content: string;
  author_id: string;
  article_id: number;
  parent_id: number;
}

export interface ICommentUpdate {
  content?: string;
}

export interface ICommentSchema {
    id: number;
    created_at: Date;
    parent_id: number | null;
    content: string;
    author: {
      id?: string;
      name: string;
      type?: string;
    };
    reply?: {
        id: number;
        created_at: Date;
        parent_id: number | null;
        content: string;
        author: {
          id?: string;
          name: string;
          type?: string;
        };
    }[];
}
