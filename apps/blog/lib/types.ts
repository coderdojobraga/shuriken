export interface IAuthor {
  name: string;
  photo: string;
  username: string;
}

export interface IPost {
  title: string;
  description: string;
  author: IAuthor;
  date: string;
  topic: string;
  featured: boolean;
  slug: string;
  content?: string;
}
