import { BlogMenu } from "@blog";

import { getAllPosts, getAuthors, BlogProps } from "~/lib/blog";

interface Props {
  blogProps: BlogProps;
  topic: string;
}

const Blog = ({ blogProps, topic }: Props) => {
  return (
    <BlogMenu
      posts={blogProps.posts}
      topics={blogProps.topics}
      authors={blogProps.authors}
      featured={blogProps.featured}
      author={null}
      topic={topic}
    />
  );
};

export async function getStaticProps({ params }) {
  const postList = getAllPosts([
    "title",
    "slug",
    "date",
    "author",
    "topic",
    "featured",
    "description",
  ]).filter((entry) => entry.topic == params.topic);

  let topicsDup = postList.map((entry) => entry.topic);
  let topics = topicsDup.filter((element, index) => {
    return topicsDup.indexOf(element) === index;
  });

  return {
    props: {
      blogProps: {
        posts: postList,
        topics: topics,
        authors: getAuthors(postList),
        featured: postList.filter((entry) => entry.featured == "true"),
      },
      topic: params.topic,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["topic"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          topic: post.topic,
        },
      };
    }),
    fallback: false,
  };
}

export default Blog;
