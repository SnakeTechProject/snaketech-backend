export interface IChallenge {
  author_id: string;
  title: string;
  description: string;
  slug: string;
  difficulty: string;
}

export interface IChallengeUpdate {
  title?: string;
  description?: string;
  slug?: string;
  difficulty?: string;
}
