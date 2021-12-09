import BlogPost from "../../landing/blog/BlogPost";

import { Footer, Header } from "../../landing";

import { getAllPosts, getPostBySlug } from "../../lib/blog";

interface Props {
  title: string;
  authorImage: string;
  author: string;
  date: string;
  content: string;
}

const BlogPostPage = ({ title, authorImage, author, date, content }: Props) => {
  return (
    <>
      <Header />
      <BlogPost
        title={title}
        authorImage={authorImage}
        author={author}
        date={date}
        content={content}
      />
      <Footer bgColor="light" fgColor="dark" />
    </>
  );
};

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "title",
    "authorImage",
    "author",
    "date",
    "draft",
    "featured",
    "content",
  ]);

  return {
    props: {
      ...post,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default BlogPostPage;
