import { Footer, Header } from "@coderdojobraga/ui";
import Belt from "~/components/Belt/Belt";
import { IBelt } from "~/lib/types";
import { BELTS } from "~/data/curriculum";

const Curriculum = () => (
  <>
    <Header landing={true} />
    <div className="container mx-auto mt-14 flex flex-col items-center gap-12">
      <div className="flex flex-1 flex-col items-center">
        <h1 className="m-4 text-center text-4xl font-bold sm:text-5xl">
          Currículo do CoderDojo Braga!
        </h1>
        <h2 className="m-4 text-2xl font-normal sm:text-3xl">
          Vamos aprender juntos?
        </h2>
      </div>
    </div>

    <div className="container mx-auto">
      <section className="relative mx-2 md:mt-28 lg:mx-12 xl:mx-20">
        <div className="container my-8 flex w-11/12 flex-col items-start py-2 sm:w-10/12 lg:w-4/6">
          <h2 className="py-2 text-2xl font-semibold sm:text-3xl">
            <span className="mr-1 text-2xl text-purple-500 sm:text-3xl">|</span>
            O que são os cinturões?
          </h2>
          <p className="sm:text-md mt-2 text-sm">
            Ao longo do seu percurso pelo CoderDojo Braga, os ninjas recebem
            cinturões. À semelhança das artes marciais, os cinturões representam
            o conhecimento e domínio da programação que os ninjas possuem. O
            caminho de cada ninja é único, mas deverá sempre passar pelos
            fundamentos da área.
          </p>
        </div>
      </section>
    </div>

    {BELTS.map((belt: IBelt) => (
      <Belt key={belt.colour} {...belt} />
    ))}

    <Footer bgColor="dark" fgColor="white" />
  </>
);

export default Curriculum;
