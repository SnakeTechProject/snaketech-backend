export interface ILike {
  fk_user_id: string;
  fk_article_id: number;
  is_liked: boolean;
}

export interface ILikeDelete {
  fk_user_id: string;
  fk_article_id: number;
}

export interface ILikeQuery {
  fk_user_id?: string;
  fk_article_id: number;
  is_liked?: boolean;
}

export interface ILikeResponse {
  like: number;
  dislike: number;
  user_liked: boolean;
}
