import fs from "fs";
import { extname, join } from "path";
import { isNil } from "lodash-es";
import matter from "gray-matter";
import { IPost } from "./types";

const POSTS_DIRECTORY = join(process.cwd(), "_posts");

export const getSlugs = (): string[] =>
  fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((file) => extname(file) == ".md")
    .map((slug) => slug.replace(/\.md$/, ""));

export function getPosts(): IPost[] {
  const posts = getSlugs()
    .map((slug: string) => getPost(slug))
    .filter((post: IPost | null): boolean => !isNil(post)) as IPost[];

  // sort posts by date in descending order
  return posts.sort((post1: IPost, post2: IPost) =>
    post1.date > post2.date ? -1 : 1
  );
}

export function getPost(slug?: string): null | IPost {
  if (slug === undefined) {
    return null;
  }

  const fullPath = join(POSTS_DIRECTORY, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const post: IPost = { ...(data as IPost), slug, content };

  return post;
}
