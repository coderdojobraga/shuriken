import { Footer, Header, Hero } from "@landing";

const Home = () => (
  <>
    <Header />
    <div className="xl:bg-yin-yang-curve-xl bg-cover bg-center -mb-10 md:mb-0">
      <Hero />
      <div className="bg-yin-yang-curve xl:bg-none bg-cover bg-center -mb-10 md:mb-0">
        <div className="container mx-auto">
          <section className="relative mx-2 lg:mx-12">
            <div className="container w-10/12 lg:w-4/6 flex flex-col items-start my-8 lg:my-24 py-2">
              <h2 className="text-3xl font-semibold py-2">
                <span className="text-purple-500 text-3xl mr-1">|</span>O que é
                o CoderDojo Braga?
              </h2>
              <p className="text-xl mt-2">
                O CoderDojo Braga integra-se num movimento global, voluntário,
                sem fins lucrativos e que visa ensinar crianças e jovens dos 7
                aos 17 anos a programar. O projeto pretende mostrar como a
                programação pode ser uma força de mudança positiva no mundo.
              </p>
            </div>
          </section>
          <section className="relative mx-2 lg:mx-12 flex justify-end text-white">
            <div className="container w-10/12 lg:w-4/6 flex flex-col items-end my-8 lg:my-24 py-2">
              <h2 className="text-3xl text-white font-semibold py-2 gap-1">
                Como funciona o Dojo?
                <span className="text-purple-500 text-3xl ml-1">|</span>
              </h2>
              <p className="text-xl mt-2 text-right">
                As sessões decorrem uma vez por mês no Departamento de
                Informática da Universidade do Minho, em Braga. São propostos
                diversos desafios aos Ninjas, consoante o nível em que se
                encontram, e que os mesmos tentam completar com a ajuda dos
                Mentores.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
    <div className="bg-dark">
      <div className="container mx-auto">
        <section className="relative mx-2 lg:mx-12 py-5">
          <div className="flex flex-col items-start my-8 lg:my-12 md:mt-0">
            <h2 className="text-white text-3xl font-semibold py-2">
              <span className="text-purple-500 text-3xl mr-1">|</span>
              Projetos em destaque
            </h2>
            <div className="w-full mx-auto mt-10 grid grid-rows-1 lg:grid-cols-2 justify-items-center">
              <div className="flex flex-col items-center">
                <div className="rounded-xl bg-purple-500 p-1 mb-4">
                  <img
                    className="rounded-xl w-96"
                    src="/img/projects/number.png"
                    alt="Guess a number preview"
                  />
                </div>
                <h3 className="text-white text-2xl">
                  Em que número estou a pensar?
                </h3>
                <h4 className="text-gray-400 text-lg">Tomás Campos</h4>
              </div>
              <div className="hidden lg:inline-flex flex flex-col items-center">
                <div className="rounded-xl bg-purple-500 p-1 mb-4">
                  <img
                    className="rounded-xl w-96"
                    src="/img/projects/number.png"
                    alt="Guess a number preview"
                  />
                </div>
                <h3 className="text-white text-2xl">
                  Em que número estou a pensar?
                </h3>
                <h4 className="text-gray-400 text-lg">Tomás Campos</h4>
              </div>
            </div>
          </div>
        </section>
        <div className="container mx-auto">
          <section className="relative mx-2 lg:mx-12 text-white py-10">
            <div className="container mx-auto">
              <hr className="py-2 mx-auto w-6/12 lg:w-3/12 border-purple-500 h-8/12 text-center text-2xl" />
              <div className="mx-auto text-center w-9/12 md:w-8/12 m-4 text-2xl">
                O CoderDojo Braga pretende dar a todas as crianças e jovens da
                região minhota a oportunidade de aprenderem a programar num
                ambiente amigável e divertido.
              </div>
              <img
                className="mx-auto"
                src="/img/logo-draw.svg"
                alt="CoderDojo Braga Draw Logo"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
    <Footer />
  </>
);

export default Home;
