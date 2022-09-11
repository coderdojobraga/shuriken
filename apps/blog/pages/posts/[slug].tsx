import { GetStaticPaths, GetStaticProps } from "next";
import { Footer, Header, useTheme } from "@coderdojobraga/ui";
import Post from "~/components/Post";

import { getPost, getPosts } from "~/lib/blog";
import { IPost } from "~/lib/types";

type Props = IPost;

export default function BlogPost(props: Props) {
  const { isDark } = useTheme();

  return (
    <div className={isDark ? "bg-dark text-white" : ""}>
      <Header landing={false} />
      <Post {...props} />
      <Footer
        bgColor={isDark ? "dark" : "light"}
        fgColor={isDark ? "light" : "dark"}
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (Array.isArray(params?.slug)) {
    return {
      props: {},
    };
  }

  const post = getPost(params?.slug);

  return {
    props: {
      ...post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getPosts().map(({ slug }) => {
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: false,
  };
};
