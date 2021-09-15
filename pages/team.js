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
        <div className="py-0.5 mx-20 mx-auto container w-6/12 lg:w-3/12 bg-primary h-8/12 text-center text-2xl" />
        <h1 className="mx-20 font-semibold text-primary text-7xl">"</h1>
        <p className="mx-20 text-black text-3xl leading-relaxed mt-4 mb-4">
          Nada é impossível. Com a mente singularmente focada e uma resolução sincera - ichinen - o ceú e a terra podem ser movidos tal e qual como um deseja. Não existe nada que não possa ser alcançado.
        </p>
        <h1 className="mx-20 font-semibold text-primary text-right text-7xl">
          "
        </h1>
        <p className="mx-20 text-black font-bold text-2xl leading-relaxed mb-4">
          - Yamamoto Tsunetomo, Hagakure Kikigaki
        </p>
      </div>
      <section className="mb-20 relative">
        <div className="pt-20 container mx-auto px-4">
          <div className="flex flex-wrap -mt-12 mx-20">
            {team.map((entry) => (
              <Member {...entry} />
            ))}
          </div>
        </div>
      </section>
      <div className="mx-20 bg-white">
        <div className="max-w-7xl mx-auto py-12 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Junta-te a nós!</span>
            <span className="block text-primary">
              Deixa a tua a marca na comunidade.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button
                type="button"
                className="bg-primary text-white rounded-3xl px-4 py-2 transform duration-300 uppercase hover:bg-purple-600"
              >
                Saber Mais
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer bgColor="white" fgColor="dark" />
    </>
  );
}
