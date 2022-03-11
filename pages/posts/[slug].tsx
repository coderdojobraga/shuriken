import BlogPost from "../../landing/blog/BlogPost";

import { Footer, Header } from "../../landing";

import { getAllPosts, getPostBySlug } from "../../lib/blog";

interface Props {
  title: string;
  photo: string;
  author: string;
  date: string;
  content: string;
}

const BlogPostPage = ({ title, photo, author, date, content }: Props) => {
  return (
    <>
      <Header />
      <BlogPost
        title={title}
        photo={photo}
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
    "photo",
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
