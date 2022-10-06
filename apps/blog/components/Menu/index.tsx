import { useState } from "react";

import Entry from "~/components/Entry";
import Author from "~/components/Author";
import Featured from "~/components/Featured";
import Pagination from "~/components/Pagination";
import Topic from "~/components/Topic";

import { Footer, Header, useTheme } from "@coderdojobraga/ui";

import { IAuthor, IPost } from "~/lib/types";
import Link from "next/link";

export interface Props {
  posts: IPost[];
  topics: string[];
  authors: IAuthor[];
  featured: IPost[];
  author?: string;
  topic?: string;
}

const Menu = ({ posts, topics, authors, featured, author, topic }: Props) => {
  const { isDark } = useTheme();

  const defaultState = {
    increasingOrder: 0,
    page: 1,
  };

  const changeOrder = (n: number) => {
    changeState({
      increasingOrder: n,
      page: st.page,
    });
  };

  const changePage = (n: number) => {
    changeState({
      increasingOrder: st.increasingOrder,
      page: n,
    });
  };

  const [st, changeState] = useState(defaultState);

  if (st.increasingOrder == 1)
    posts.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  else
    posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  const postsPerPage = 24;
  let postCount = posts.length;
  posts = posts.slice(
    postsPerPage * (st.page - 1),
    Math.min(posts.length, postsPerPage * st.page)
  );

  return (
    <>
      <Header landing={true} />
      <div
        className={`${isDark ? "dark" : "light"} relative overflow-x-hidden`}
      >
        <div className="dark:bg-dark px-6 py-8">
          <div className="container mx-auto flex justify-between">
            <div className="w-full lg:w-8/12">
              <div className="flex items-center justify-between">
                <h1 className="text-dark ml-20 mb-5 text-center text-5xl font-bold dark:text-white">
                  <span className="mr-1 text-5xl text-purple-500">|</span>
                  {author == null && topic == null ? "Blog" : ""}
                  {author != null ? "Blog de " + author : ""}
                  {topic != null ? "Blog: " + topic : ""}
                </h1>
                <div className="mr-16">
                  <select
                    onChange={(e) => changeOrder(Number(e.target.value))}
                    className="dark:bg-dark w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:text-white"
                  >
                    <option value={0}> Mais recentes</option>
                    <option value={1}> Mais antigos </option>
                  </select>
                </div>
              </div>
              {(author != null || topic != null) && (
                <Link href="/">
                  <a className="text-primary ml-28 px-1 text-lg font-bold hover:underline dark:text-white">
                    Voltar ao blog completo
                  </a>
                </Link>
              )}
              <div className="ml-20">
                {posts.map((entry, key) => (
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
              <div className="mt-10 px-8">
                <h1 className="text-dark text-xl font-bold dark:text-white">
                  ⭐ Artigos em Destaque
                </h1>
                {featured.map((post) => (
                  <Featured key={post.slug} {...post} />
                ))}
              </div>

              <div className="px-8">
                <h1 className="text-dark mt-8 mb-4 text-xl font-bold dark:text-white">
                  ✍️ Autores
                </h1>
                <div className="dark:bg-altdark mt-4 flex max-w-sm flex-col rounded-lg bg-white px-6 py-2 shadow-md">
                  <ul className="-mx-4">
                    {authors.map((author) => (
                      <Author key={author.username} {...author} />
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 px-8">
                <h1 className="text-dark mb-4 text-xl font-bold dark:text-white">
                  💭 Tópicos
                </h1>
                <div className="dark:bg-altdark relative flex max-w-sm flex-wrap rounded-lg bg-white px-4 py-6 shadow-md">
                  {topics.map((topic) => (
                    <Topic key={topic} title={topic} />
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

export default Menu;
