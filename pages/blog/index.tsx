import BlogMenu from "/landing/blog/BlogMenu";

import { getPostSlugs, getAllPosts, getAuthors, BlogProps } from "/lib/blog";

const Blog = ({ posts, topics, authors, featured }: BlogProps) => {
  return (
    <BlogMenu
      posts={posts}
      topics={topics}
      authors={authors}
      featured={featured}
      author={null}
      topic={null}
    />
  );
};

export async function getStaticProps(context) {
  const postList = getAllPosts([
    "title",
    "slug",
    "date",
    "author",
    "photo",
    "topic",
    "featured",
    "description",
  ]);

  let topicsDup = postList.map((entry) => entry.topic);
  let topics = topicsDup.filter((element, index) => {
    return topicsDup.indexOf(element) === index;
  });

  return {
    props: {
      posts: postList,
      topics: topics,
      authors: getAuthors(postList),
      featured: postList.filter((entry) => entry.featured == "true"),
    },
  };
}

export default Blog;
