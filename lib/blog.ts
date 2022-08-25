import fs from "fs";
import { join, extname } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");

export interface Post {
  title: string;
  description: string;
  author: {
    name: string;
    photo: string;
  };
  date: string;
  topic: string;
  featured: string;
  slug: string;
}

export interface BlogProps {
  posts: Post[];
  topics: string[];
  authors: IAuthor[];
  featured: Post[];
}

export interface IAuthor {
  author: {
    name: string;
    photo: string;
  };
  posts: number;
}

export function getPostSlugs() {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => extname(file) == ".md");
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAuthors(posts) {
  var result = [];

  for (var i = 0; i < posts.length; i++) {
    var found = false;
    for (var j = 0; j < result.length; j++) {
      if (result[j].author == posts[i].author) {
        result[j].posts++;
        found = true;
        break;
      }
    }

    if (!found) {
      result.push({ author: posts[i].author, posts: 1 });
    }
  }

  return result;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
