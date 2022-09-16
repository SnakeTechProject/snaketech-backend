export interface IArticle {
  title: string;
  slug: string;
  content: string;
  author_id: string;
}

export interface IArticleUpdate {
  title?: string;
  slug?: string;
  content?: string;
}
