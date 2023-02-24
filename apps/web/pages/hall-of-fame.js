import { Footer, Header } from "@coderdojobraga/ui";
import Champions from "~/components/Champions";

import hof from "~/data/hall_of_fame.json";
import honorable from "~/data/honorable.json";

export default function HallOfFame() {
  return (
    <>
      <Header landing={true} />

      <div className="container mx-auto mt-12">
        <h1 className="m-4 text-center text-4xl font-bold sm:text-5xl">
          Hall Of Fame
        </h1>

        <div className="bg-primary h-8/12 container mx-auto w-6/12 py-0.5 text-center text-2xl lg:w-3/12" />

        <p className="mx-2 mt-4 text-center text-2xl leading-relaxed text-black lg:mx-12">
          O CoderDojo Braga é um projeto mantido e acarinhado por pessoas
          dedicadas e apaixonadas pelo trabalho que fazem!
        </p>
        <p className="mx-2 mb-4 text-center text-2xl leading-relaxed text-black lg:mx-12">
          Aqui, poderás conhecer alguns dos voluntários que tornaram esta
          iniciativa tão especial e naquilo que é hoje.
        </p>
      </div>

      <div className="relative mb-20">
        <div className="container mx-auto pt-20">
          <div className="mx-2 -mt-12 flex flex-wrap lg:mx-12">
            {hof.map((entry) => (
              <Champions key={entry.name} {...entry} />
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-12">
        <h1 className="m-4 text-center text-4xl font-bold sm:text-5xl">
          Menções honrosas
        </h1>

        <div className="bg-primary h-8/12 container mx-auto w-6/12 py-0.5 text-center text-2xl lg:w-3/12" />
      </div>

      <div className="relative mb-20">
        <div className="container mx-auto pt-20">
          <div className="mx-2 -mt-12 flex flex-wrap lg:mx-12">
            {honorable.map((entry) => (
              <Champions key={entry.name} {...entry} />
            ))}
          </div>
        </div>
      </div>

      <Footer bgColor="white" fgColor="dark" />
    </>
  );
}
