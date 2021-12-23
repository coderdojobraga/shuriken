import {useState} from 'react';

import {
  Footer,
  Header,
  Entry,
  Author,
  Feature,
  Pagination,
  Topic,
} from "@landing";

import {
  getPostSlugs,
  getAllPosts
} from '../lib/blog';

import { useTheme } from "../components/Theme";

import posts from "data/blog.json";
import features from "data/feature.json";

interface Post {
  title : string;
  description: string;
  author: string;
  date: string; 
  photo: string;
  topic: string;
  featured: string;
};

interface Props {
  posts: Post[];
  topics: string[];
};

const Blog = ({posts, topics} : Props) => {
  const { isDark } = useTheme();

  const defaultState = {
    increasingOrder : false
  };

  const [st, changeState] = useState(defaultState);

  return (
    <>
      <Header />

      <div className={`${isDark ? "dark" : "light"} relative overflow-x-hidden`}>
        <div className="dark:bg-dark px-6 py-8">
          <div className="container flex justify-between mx-auto">
            <div className="w-full lg:w-8/12">
              <div className="flex items-center justify-between">
                <h1 className="dark:text-white ml-20 text-center font-bold text-dark text-5xl">
                  <span className="text-purple-500 text-2xl text-5xl mr-1">
                    |
                  </span>
                  Blog
                </h1>
                <div className="mr-16">
                  <select className="dark:bg-dark dark:text-white w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option> Latest </option>
                    <option> Oldest </option>
                  </select>
                </div>
              </div>

              <div className="ml-20">
                {posts.map((key, entry) => (
                  <Entry key={key} {...entry} />
                ))}
              </div>

              <Pagination />
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
                <h1 className="mt-8 mb-4 text-xl font-bold text-dark dark:text-white">✍️ Autores</h1>
                <div className="dark:bg-altdark mt-4 flex flex-col max-w-sm px-6 py-2 bg-white rounded-lg shadow-md">
                  <ul className="-mx-4">
                    <Author
                      author="Filipe Felício"
                      photo="filipe.png"
                      numberPosts={2}
                    />
                    <Author
                      author="Nelson Estevão"
                      photo="nelson.png"
                      numberPosts={2}
                    />
                    <Author
                      author="Marta Silva"
                      photo="marta.png"
                      numberPosts={1}
                    />
                    <Author
                      author="Jessica Fernandes"
                      photo="jessica.png"
                      numberPosts={1}
                    />
                    <Author
                      author="Vitor Lelis"
                      photo="lelis.png"
                      numberPosts={1}
                    />
                  </ul>
                </div>
              </div>

              <div className="px-8 mt-10">
                <h1 className="mb-4 text-xl font-bold text-dark dark:text-white">💭 Tópicos</h1>
                <div className="flex flex-wrap relative max-w-sm px-4 py-6 dark:bg-altdark bg-white rounded-lg shadow-md">
                  {topics.map((topic => <Topic title={topic}/>))}
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
}

export async function getStaticProps(context) {
  const postList = getAllPosts(["title", "slug", "date", "author", "photo", "topic", "featured", "description"]);

  let topicsDup = postList.map(entry => entry.topic);
  let topics    = topicsDup.filter((element, index) => {
    return topicsDup.indexOf(element) === index;
  });

  return {
    props: {
      posts: postList,
      topics: topics,
    }
  }
}


export default Blog;
