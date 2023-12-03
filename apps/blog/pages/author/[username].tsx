import { GetStaticPaths, GetStaticProps } from "next";
import { uniq, uniqBy } from "lodash-es";
import Menu, { Props as MenuProps } from "~/components/Menu";
import { IAuthor, IPost } from "~/lib/types";

import { getPosts } from "~/lib/blog";

type Props = MenuProps & { author: IAuthor };

export default function Blog(props: Props) {
  return <Menu {...props} />;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = getPosts();

  const authorPosts = posts.filter(
    ({ author: { username } }) => username === params?.username,
  );

  const featuredPosts = posts.filter(({ featured }) => featured);

  const topics = uniq(posts.map(({ topic }) => topic));
  const authors = uniqBy(
    posts
      .map(({ author }: IPost) => author)
      .filter(({ username }: IAuthor) => username !== params?.username),
    ({ username }: IAuthor) => username,
  );

  return {
    props: {
      posts: authorPosts,
      topics: topics,
      authors: authors,
      featured: featuredPosts,
      username: params?.username,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getPosts().map(({ author: { username } }) => {
      return {
        params: {
          username,
        },
      };
    }),
    fallback: false,
  };
};
