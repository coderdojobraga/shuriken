import { Header, Member, Footer } from "@landing";

import team from "~/data/team.json";

export default function Team() {
  return (
    <>
      <Header />
      <div className="mt-12 container mx-auto">
        <h1 className="text-4xl sm:text-5xl text-center font-bold m-4">
          Equipa
        </h1>
        <div className="py-0.5 mx-auto w-6/12 lg:w-3/12 bg-primary h-8/12 text-center text-2xl" />
        <p className="pt-6 text-xl sm:text-xl font-normal m-4">
          Adding a "Meet the Team" page or section to your website is an easy,
          effective way to give your business an accessible face. As one of your
          most important pages, it gives prospects an idea of who exactly
          they'll be working with, and shows potential employees that you're
          proud of the people on your team.
        </p>
      </div>
      <section className="mb-20 relative">
        <div className="pt-20 container mx-auto px-4">
          <div className="flex flex-wrap -mt-12">
            {team.map((entry) => (
              <Member {...entry} />
            ))}
          </div>
        </div>
      </section>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Junta-te a nós!</span>
            <span className="block text-primary">
              Deixa a tua a marca na comunidade.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href=""
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-purple-600"
              >
                Saber Mais
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer bgColor="white" fgColor="dark" />
    </>
  );
}
