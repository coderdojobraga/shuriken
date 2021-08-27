import { Footer, Header, Entry, Author, Feature, Pagination, Topic } from "@landing";

import posts from "data/blog.json"
import features from "data/feature.json"

const Blog = () => (
  <>
    <Header />

    <div class="relative overflow-x-hidden">
      <div class="px-6 py-8">
        <div class="container flex justify-between mx-auto">
          <div class="w-full lg:w-8/12">
            <div class="flex items-center justify-between">
              <h1 class="ml-20 text-center font-bold text-dark text-5xl">
                <span className="text-purple-500 text-2xl text-5xl mr-1">|</span>
                Blog
              </h1>
              <div className="mr-16">
                <select class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                  <option> Latest </option>
                  <option> Oldest </option>
                </select>
              </div>
            </div>


            <div class="ml-20">
              {posts.map(entry => (
                <Entry {...entry} />
              ))}
            </div>

            <Pagination />

          </div >

          <div class="hidden w-4/12 lg:block">

            <div class="px-8 mt-10">
              <h1 class="text-xl font-bold text-dark">⭐ Artigos em Destaque</h1>
              {features.map(entry => (
                <Feature {...entry} />
              ))}
            </div>

            <div class="px-8">
              <h1 class="mt-8 mb-4 text-xl font-bold text-dark">✍️ Autores</h1>
              <div class="mt-4 flex flex-col max-w-sm px-6 py-2 bg-white rounded-lg shadow-md">
                <ul class="-mx-4">
                  <Author author="Filipe Felício" photo="filipe.png" numberPosts={2} />
                  <Author author="Nelson Estevão" photo="nelson.png" numberPosts={2} />
                  <Author author="Marta Silva" photo="marta.png" numberPosts={1} />
                  <Author author="Jessica Fernandes" photo="jessica.png" numberPosts={1} />
                  <Author author="Vitor Lelis" photo="lelis.png" numberPosts={1} />
                </ul>
              </div>
            </div>

            <div class="px-8 mt-10">
              <h1 class="mb-4 text-xl font-bold text-dark">💭 Tópicos</h1>
              <div class="flex flex-wrap relative max-w-sm px-4 py-6 bg-white rounded-lg shadow-md">
                  <Topic title="Recrutamento"/>
                  <Topic title="Eventos"/>
                  <Topic title="Humor"/>
                  <Topic title="Scratch"/>
                  <Topic title="Elixir"/>
                  <Topic title="JavaScript"/>
                  <Topic title="Ruby"/>
                  <Topic title="Linux"/>
                  <Topic title="Python"/>
                  <Topic title="Git"/>
                  <Topic title="Haskel"/>
                  <Topic title="SQL"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer bgColor="white" fgColor="dark" />
  </>
);

export default Blog;
