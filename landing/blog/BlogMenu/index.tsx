import { useState } from "react";

import {
  Footer,
  Header,
  Entry,
  Author,
  Feature,
  Pagination,
  Topic,
} from "@landing";

import { useTheme } from "/components/Theme";

import posts from "/data/blog.json";
import features from "/data/feature.json";

interface Props {
  posts: Post[];
  topics: string[];
  authors: IAuthor[];
  featured: Post[];
  author: string;
  topic: string;
}

const BlogMenu = ({
  posts,
  topics,
  authors,
  featured,
  author,
  topic,
}: Props) => {
  const { isDark } = useTheme();

  const defaultState = {
    increasingOrder: 0,
    page: 1,
  };

  const changeOrder = (n) => {
    changeState({
      increasingOrder: n,
      page: st.page,
    });
  };

  const changePage = (n) => {
    changeState({
      increasingOrder: st.increasingOrder,
      page: n,
    });
  };

  const [st, changeState] = useState(defaultState);

  if (st.increasingOrder == 1)
    posts.sort((a, b) => new Date(a.date) - new Date(b.date));
  else posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const postsPerPage = 1;
  let postCount = posts.length;
  posts = posts.slice(
    postsPerPage * (st.page - 1),
    Math.min(posts.length, postsPerPage * st.page)
  );

  return (
    <>
      <Header />

      <div
        className={`${isDark ? "dark" : "light"} relative overflow-x-hidden`}
      >
        <div className="dark:bg-dark px-6 py-8">
          <div className="container flex justify-between mx-auto">
            <div className="w-full lg:w-8/12">
              <div className="flex items-center justify-between">
                <h1 className="dark:text-white ml-20 mb-5 text-center font-bold text-dark text-5xl">
                  <span className="text-purple-500 text-2xl text-5xl mr-1">
                    |
                  </span>
                  {author == null && topic == null ? "Blog" : ""}
                  {author != null ? "Blog de " + author : ""}
                  {topic != null ? "Blog: " + topic : ""}
                </h1>
                <div className="mr-16">
                  <select
                    onChange={(e) => changeOrder(e.target.value)}
                    className="dark:bg-dark dark:text-white w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value={0}> Latest </option>
                    <option value={1}> Oldest </option>
                  </select>
                </div>
              </div>
              {author != null || topic != null ? (
                <a
                  href="/blog"
                  className="ml-28 px-1 text-lg font-bold dark:text-white text-primary hover:underline"
                >
                  Voltar ao blog completo
                </a>
              ) : (
                <></>
              )}
              <div className="ml-20">
                {posts.map((key, entry) => (
                  <Entry key={key} {...entry} />
                ))}
              </div>

              <Pagination
                postCount={postCount}
                currentPage={st.page}
                postsPerPage={postsPerPage}
                onChange={changePage}
              />
            </div>

            <div className="hidden w-4/12 lg:block">
              <div className="px-8 mt-10">
                <h1 className="text-xl font-bold dark:text-white text-dark">
                  ⭐ Artigos em Destaque
                </h1>
                {features.map((key, entry) => (
                  <Feature key={key} {...entry} />
                ))}
              </div>

              <div className="px-8">
                <h1 className="mt-8 mb-4 text-xl font-bold text-dark dark:text-white">
                  ✍️ Autores
                </h1>
                <div className="dark:bg-altdark mt-4 flex flex-col max-w-sm px-6 py-2 bg-white rounded-lg shadow-md">
                  <ul className="-mx-4">
                    {authors.map((obj) => (
                      <Author
                        author={obj.author}
                        photo={obj.image}
                        numberPosts={obj.posts}
                      />
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-8 mt-10">
                <h1 className="mb-4 text-xl font-bold text-dark dark:text-white">
                  💭 Tópicos
                </h1>
                <div className="flex flex-wrap relative max-w-sm px-4 py-6 dark:bg-altdark bg-white rounded-lg shadow-md">
                  {topics.map((topic) => (
                    <Topic title={topic} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer
        bgColor={isDark ? "dark" : "white"}
        fgColor={isDark ? "white" : "dark"}
      />
    </>
  );
};

export default BlogMenu;
