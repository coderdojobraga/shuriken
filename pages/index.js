import Head from "next/head";
import { Footer, Header, Hero } from "@landing";

export default function Home() {
  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <Hero />
      <section class="relative">
        <div class="container w-10/12 lg:w-4/6 flex flex-col items-start m-8 lg:m-24 py-2">
          <h2 class="text-3xl font-semibold py-2">
            <span class="text-blue-500 text-3xl mr-1">|</span>O que é o
            CoderDojo Braga?
          </h2>
          <p class="text-xl mt-2">
            O CoderDojo Braga integra-se num movimento global, voluntário, sem
            fins lucrativos e que visa ensinar crianças e jovens dos 7 aos 17
            anos a programar. O projeto pretende mostrar como a programação pode
            ser uma força de mudança positiva no mundo.
          </p>
        </div>
      </section>
      <section class="relative flex justify-end">
        <div class="container w-10/12 lg:w-4/6 flex flex-col items-end m-8 lg:m-24 py-2">
          <h2 class="text-3xl font-semibold py-2 gap-1">
            Como funciona o Dojo?
            <span class="text-blue-500 text-3xl ml-1">|</span>
          </h2>
          <p class="text-xl mt-2 text-right">
            As sessões decorrem uma vez por mês no Departamento de Informática
            da Universidade do Minho, em Braga. São propostos diversos desafios
            aos Ninjas, consoante o nível em que se encontram, e que os mesmos
            tentam completar com a ajuda dos Mentores.
          </p>
        </div>
      </section>
      <section class="relative">
        <div class="flex flex-col items-start m-8 lg:m-24 md:mt-0">
          <h2 class="text-3xl font-semibold py-2">
            <span class="text-blue-500 text-3xl mr-1">|</span>
            Projetos em destaque
          </h2>
          <div class="w-full mx-auto mt-10 grid grid-rows-1 lg:grid-cols-2 justify-items-center">
            <div class="flex flex-col items-center">
              <img class="w-96" src="/img/logo-lettering.png" />
              <h3 class="text-2xl">Em que número estou a pensar?</h3>
              <h4 class="text-lg">Tomás Campos</h4>
            </div>
            <div class="hidden lg:inline-flex flex flex-col items-center">
              <img class="w-96" src="/img/logo-lettering.png" />
              <h3 class="text-2xl">Em que número estou a pensar?</h3>
              <h4 class="text-lg">Tomás Campos</h4>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
