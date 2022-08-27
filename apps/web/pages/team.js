import { Header, Footer } from "@coderdojobraga/ui";
import Member from "~/components/Member";

import team from "~/data/team.json";

export default function Team() {
  return (
    <>
      <Header landing={true} />

      <div className="mx-auto mt-12 container">
        <h1 className="text-4xl sm:text-5xl text-center font-bold m-4">
          Equipa
        </h1>

        <div className="mx-auto py-0.5 container w-6/12 lg:w-3/12 bg-primary h-8/12 text-center text-2xl" />

        <p className="mx-2 lg:mx-12 text-black text-2xl text-center leading-relaxed mt-4 mb-4">
          A equipa do CoderDojo Braga é composta por alunos voluntários de
          vários cursos dedicados e apaixonados pelo projeto e por tecnologia.
          Cada uma traz o seu contributo único para criar uma experiencia
          incrível para os Ninjas e todos envolvidos com o projeto. Mais do que
          uma equipa, todos aqueles que decidem se envolver connosco encontram
          uma família.
        </p>
      </div>

      <div className="mb-20 relative">
        <div className="mx-auto pt-20 container">
          <div className="mx-2 lg:mx-12 flex flex-wrap -mt-12">
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
