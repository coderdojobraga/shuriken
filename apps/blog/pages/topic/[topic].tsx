import { GetStaticPaths, GetStaticProps } from "next";
import { uniq, uniqBy } from "lodash-es";
import Menu, { Props as MenuProps } from "~/components/Menu";

import { getPosts } from "~/lib/blog";
import { IAuthor, IPost } from "~/lib/types";

type Props = MenuProps & { topic: string };

export default function Blog(props: Props) {
  return <Menu {...props} />;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = getPosts();

  const topicPosts = posts.filter(({ topic }) => topic == params?.topic);

  const featuredPosts = posts.filter(({ featured }) => featured);

  const topics = uniq(
    posts
      .map(({ topic }) => topic)
      .filter((topic: string) => topic !== params?.topic),
  );

  const authors = uniqBy(
    posts.map(({ author }: IPost) => author),
    ({ username }: IAuthor) => username,
  );

  return {
    props: {
      posts: topicPosts,
      topics: topics,
      authors: authors,
      featured: featuredPosts,
      topic: params?.topic,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getPosts().map(({ topic }) => {
      return {
        params: {
          topic,
        },
      };
    }),
    fallback: false,
  };
};
