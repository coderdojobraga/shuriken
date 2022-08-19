import fs from "fs";
import { join, extname } from "path";

import Image from "next/image";
import { Footer, Header } from "@landing";

const Belt = ({ colour, description, image, requirements }) => {
  return (
    <div className="container mx-auto">
      <section id={colour} className="relative mx-2 lg:mx-12 xl:mx-20 md:my-28">
        <div className="flex flex-row items-center my-8 py-2 ">
          <div className="block">
            <h2 className="text-2xl sm:text-3xl font-semibold py-2">
              <span className="text-purple-500 text-2xl sm:text-3xl mr-1">
                |
              </span>
              Cinturão {colour}
            </h2>
            <p className="text-md md:mr-36 mt-4">{description}</p>
            <p className="mt-6 font-semibold">Requisitos:</p>
            <ul className="pl-4 list-disc text-sm sm:text-md mt-2">
              {requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <div className="ml-auto">
            <div className="block w-48 h-48">
              <Image
                src={`/img/ninjas/${image}`}
                width={300}
                height={300}
                alt={colour}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Curriculum = ({ belts }) => (
  <>
    <Header landing={true} />
    <div className="container mx-auto flex flex-col items-center gap-12 mt-14">
      <div className="flex flex-col flex-1 items-center">
        <h1 className="text-4xl sm:text-5xl text-center font-bold m-4">
          Currículo do CoderDojo Braga!
        </h1>
        <h2 className="text-2xl sm:text-3xl font-normal m-4">
          Vamos aprender juntos?
        </h2>
      </div>
    </div>

    <div className="container mx-auto">
      <section className="relative mx-2 lg:mx-12 xl:mx-20 md:mt-28">
        <div className="container w-11/12 sm:w-10/12 lg:w-4/6 flex flex-col items-start my-8 py-2">
          <h2 className="text-2xl sm:text-3xl font-semibold py-2">
            <span className="text-purple-500 text-2xl sm:text-3xl mr-1">|</span>
            O que são os cinturões?
          </h2>
          <p className="text-sm sm:text-md mt-2">
            Ao longo do seu percurso pelo CoderDojo Braga, os ninjas recebem
            cinturões. À semelhança das artes marciais, os cinturões representam
            o conhecimento e domínio da programação que os ninjas possuem. O
            caminho de cada ninja é único, mas deverá sempre passar pelos
            fundamentos da área.
          </p>
        </div>
      </section>
    </div>

    {belts.map((b) => (
      <Belt key={b.colour} {...b} />
    ))}

    <Footer bgColor="dark" fgColor="white" />
  </>
);

export async function getStaticProps() {
  const fullPath = join(process.cwd(), "data/curriculum.json");
  const fileContents = fs.readFileSync(fullPath, "utf8");

  return {
    props: {
      belts: JSON.parse(fileContents),
    },
  };
}

export default Curriculum;
