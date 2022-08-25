import BlogPost from "blog/BlogPost";

import { Footer, Header } from "@landing";

import { getAllPosts, getPostBySlug } from "~/lib/blog";

import { useTheme } from "~/components/Theme";

interface Props {
  title: string;
  author: {
    name: string;
    photo: string;
  };
  date: string;
  content: string;
}

const BlogPostPage = ({ title, author, date, content }: Props) => {
  const { isDark } = useTheme();
  return (
    <div className={isDark ? "bg-dark text-white" : ""}>
      <Header landing={false} />
      <BlogPost
        title={title}
        photo={author.photo}
        author={author}
        date={date}
        content={content}
      />
      <Footer
        bgColor={isDark ? "dark" : "light"}
        fgColor={isDark ? "light" : "dark"}
      />
    </div>
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
