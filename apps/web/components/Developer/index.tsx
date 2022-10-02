import { PullRequestOutlined } from "@ant-design/icons";
import Image from "next/image";

export default function Developer() {
  return (
    <section className="bg-dark overflow-hidden">
      <div className="container mx-auto mb-20 ">
        <div className="flex flex-wrap justify-center">
          <div className="ml-auto mr-auto mt-20 w-full px-12 md:w-5/12 md:px-4">
            <div className="text-dark mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
              <PullRequestOutlined style={{ fontSize: "150%" }} />
            </div>
            <h3 className="mb-2 text-3xl font-semibold leading-normal text-white">
              Contribui para as plataformas Open Source do CoderDojo Braga
            </h3>
            <p className="mt-4 mb-4 text-lg font-light leading-relaxed text-white">
              O código-fonte destas plataformas é público, o que significa que
              qualquer pessoa pode ver e contribuir para as mesmas
            </p>
            <p className="mt-0 mb-4 text-lg font-light leading-relaxed text-white">
              Ao contribuires para as nossas plataformas, estás não só a ganhar
              experiência profissional, como a melhorar a qualidade do trabalho
              que desenvolvemos.
            </p>
            <a
              href="https://github.com/coderdojobraga/shuriken"
              className="bg-primary mt-4 mr-2
                                       mb-1 inline-block rounded-3xl px-6 py-4
                                       text-sm font-bold uppercase text-white shadow outline-none
                                       hover:bg-purple-600 hover:text-white"
            >
              Shuriken
            </a>
            <a
              href="https://github.com/coderdojobraga/bokken"
              className="bg-primary mt-4 mr-2 
                                       mb-1 inline-block rounded-3xl px-6 py-4
                                       text-sm font-bold uppercase text-white shadow outline-none
                                       hover:bg-purple-600 hover:text-white"
            >
              Bokken
            </a>
            <a
              href="https://github.com/coderdojobraga"
              className="mt-4 mr-1 mb-1 
                                       inline-block rounded px-6 py-4 text-sm
                                       font-bold uppercase text-white outline-none
                                       hover:text-purple-600"
            >
              Saber Mais
            </a>
          </div>
          <div className="relative mr-auto ml-auto w-6/12 pl-80 pt-20">
            <Image alt="Code" src="/img/code.svg" width={540} height={400} />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 mb-20">
        <div className="relative z-10 flex flex-wrap justify-center px-12">
          <div className="w-full lg:w-8/12">
            <h2 className="text-7xl font-semibold text-white">&quot;</h2>
            <p className="mt-4 mb-4 text-2xl leading-relaxed text-white">
              Ser voluntário no CoderDojo Braga é uma experiência muito
              gratificante, pois permite-me apoiar e melhorar uma organização
              cujas atividades têm um efeito positivo profundo e duradouro nos
              ninjas, mentores e voluntários que nelas participam.
            </p>
            <h2 className="text-right text-7xl font-semibold text-white">
              &quot;
            </h2>
            <p className="mb-4 text-2xl leading-relaxed text-white">
              - Miguel Brandão, Engenharia Informática
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
