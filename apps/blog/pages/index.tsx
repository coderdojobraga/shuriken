import { GetStaticPaths, GetStaticProps } from "next";
import { uniq, uniqBy } from "lodash-es";
import Menu, { Props as MenuProps } from "~/components/Menu";

import { getPosts } from "~/lib/blog";

export default function Blog({ posts, topics, authors, featured }: MenuProps) {
  return (
    <Menu posts={posts} topics={topics} authors={authors} featured={featured} />
  );
}

export const getStaticProps: GetStaticProps = async (_context) => {
  const posts = getPosts();
  const topics = uniq(posts.map(({ topic }) => topic));
  const featuredPosts = posts.filter(({ featured }) => featured);
  const authors = uniqBy(
    posts.map(({ author }) => author),
    ({ username }) => username
  );

  return {
    props: {
      posts: posts,
      topics: topics,
      authors: authors,
      featured: featuredPosts,
    },
  };
};
