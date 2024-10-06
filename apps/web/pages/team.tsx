import { Footer, Header } from "@coderdojobraga/ui";
import Member from "~/components/Member";

import { ITeamMember } from "~/lib/types";

export default function Team({ team }: { team: ITeamMember[] }) {
  return (
    <>
      <Header landing={true} />

      <div className="container mx-auto mt-12">
        <h1 className="m-4 text-center text-4xl font-bold sm:text-5xl">
          Equipa
        </h1>

        <div className="bg-primary h-8/12 container mx-auto w-6/12 py-0.5 text-center text-2xl lg:w-3/12" />

        <p className="mx-2 mt-4 mb-4 text-center text-2xl leading-relaxed text-black lg:mx-12">
          A equipa do CoderDojo Braga é composta por alunos voluntários de
          vários cursos dedicados e apaixonados pelo projeto e por tecnologia.
          Cada um traz o seu contributo único para criar uma experiencia
          incrível para os Ninjas e todos envolvidos com o projeto. Mais do que
          uma equipa, todos aqueles que se decidem envolver connosco encontram
          uma família.
        </p>
      </div>

      <div className="relative mb-20">
        <div className="container mx-auto pt-20">
          <div className="mx-2 -mt-12 flex flex-wrap lg:mx-12">
            {team.map((entry) => (
              <Member key={entry.name} {...entry} />
            ))}
          </div>
        </div>
      </div>

      <Footer bgColor="white" fgColor="dark" />
    </>
  );
}

import fsPromises from "fs/promises";
import path from "path";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "team.json");
  const jsonData = await fsPromises.readFile(filePath, "utf-8");
  const parsedData = JSON.parse(jsonData);

  return {
    props: {
      team: parsedData,
    },
    revalidate: 3600, // 1 hour in seconds
  };
}
