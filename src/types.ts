export type Category = {
  id: string;
  name: string;
  bio?: string;
  sources: string[];
  avatarSrc?: string;
  includeUrlRegex?: string[];
  excludeUrlRegex?: string;
  twitterUsername?: string;
  githubUsername?: string;
  websiteUrl?: string;
};

export type PostItem = {
  title: string;
  authorName?: string;
  link: string;
  contentSnippet?: string;
  isoDate?: string;
  dateMiliSeconds: number;
  imageUrl?: string;
  categoryId?: string;
  categoryName?: string;
};
