import { Footer, Header } from "@coderdojobraga/ui";
import Image from "next/image";
import Hero from "~/components/Hero";

import styles from "~/styles/index.module.css";

const Home = () => (
  <>
    <Header landing={true} />
    <Hero />
    <div className="container mx-auto">
      <section className="relative mx-2 md:mt-28 lg:mx-12 xl:mx-20">
        <div className="container my-8 flex w-11/12 flex-col items-start py-2 sm:w-10/12 lg:w-4/6">
          <h2 className="py-2 text-2xl font-semibold sm:text-3xl">
            <span className="mr-1 text-2xl text-purple-500 sm:text-3xl">|</span>
            O que é o CoderDojo Braga?
          </h2>
          <p className="mt-2 text-lg sm:text-xl">
            O CoderDojo Braga integra-se num movimento global, voluntário, sem
            fins lucrativos e que visa ensinar crianças e jovens dos 7 aos 17
            anos a programar. O projeto pretende mostrar como a programação pode
            ser uma força de mudança positiva no mundo.
          </p>
        </div>
      </section>
    </div>
    <div className="container mx-auto">
      <section className="relative mx-2 my-12 flex justify-end text-white lg:mx-12 xl:mx-20">
        <div className="container my-8 flex w-11/12 flex-col items-end py-2 sm:w-10/12 lg:w-4/6">
          <h2 className="gap-1 py-2 text-2xl font-semibold text-white sm:text-3xl">
            Como funciona o Dojo?
            <span className="ml-1 text-2xl text-purple-500 sm:text-3xl">|</span>
          </h2>
          <p className="mt-2 text-right text-lg sm:text-xl">
            As sessões decorrem uma vez por mês no Departamento de Informática
            da Universidade do Minho, em Braga. São propostos diversos desafios
            aos Ninjas, consoante o nível em que se encontram, e que os mesmos
            tentam completar com a ajuda dos Mentores.
          </p>
        </div>
      </section>
    </div>

    <div className="relative">
      <div className={styles.rectangle} />
      <div className={styles.curve} />
      <div className={styles.base} />
    </div>

    <div className="container mx-auto pb-96"></div>
    <div className="bg-dark">
      <div className="container mx-auto">
        <section className="relative mx-2 py-10 text-white lg:mx-12 xl:mx-20">
          <div className="container mx-auto">
            <hr className="mx-auto w-6/12 border-purple-500 py-2 text-center lg:w-3/12" />
            <div className="m-4 mx-auto w-9/12 text-center text-2xl md:w-8/12">
              O CoderDojo Braga pretende dar a todas as crianças e jovens da
              região minhota a oportunidade de aprenderem a programar num
              ambiente amigável e divertido.
            </div>
            <div className="mx-auto mt-12 w-24">
              <Image
                layout="fixed"
                width={80}
                height={80}
                src="/img/logo-draw-white.svg"
                alt="CoderDojo Braga Draw Logo"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
    <Footer bgColor="dark" fgColor="white" />
  </>
);

export default Home;
