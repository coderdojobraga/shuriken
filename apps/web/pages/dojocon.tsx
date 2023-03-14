
import { Footer, Header } from "@coderdojobraga/ui";
import Speaker from "~/components/Speaker";
import Schedule from "~/components/Schedule";

import speakers from "~/data/speakers.json";

export default function DojoCon() {
    return (
        <>
            <Header landing={true} />

            <div className="container mx-auto mt-12">
                <h1 className="m-4 text-center text-4xl font-bold sm:text-5xl">
                    Evento DojoCon
                </h1>

                <div className="bg-primary h-8/12 container mx-auto w-6/12 py-0.5 text-center text-2xl lg:w-3/12" />

                <p className="mx-2 mt-4 text-center text-xl leading-relaxed text-black lg:mx-12">
                    A DojoCon Braga é um evento realizado pelo CoderDojo Braga que pretende reunir associações de CoderDojos, professores e outros convidados com o objetivo de discutir o ensino de programação a jovens, através de talks, tertúlias e debates, onde os convidados irão partilhar e comentar ideias e perspetivas para fomentar o pensamento crítico e promover a melhoria das nossas iniciativas!
                </p>
            </div>

            <div className="container mx-auto mt-12">
                <h1 className="m-4 text-center text-4xl font-bold sm:text-5xl">
                    Horário
                </h1>

                <div className="bg-primary h-8/12 container mx-auto w-6/12 py-0.5 text-center text-2xl lg:w-3/12" />
            </div>

            <Schedule></Schedule>

            <div className="container mx-auto mt-12">
                <h1 className="m-4 text-center text-4xl font-bold sm:text-5xl">
                    Oradores
                </h1>

                <div className="bg-primary h-8/12 container mx-auto w-6/12 py-0.5 text-center text-2xl lg:w-3/12" />
            </div>

            <div className="relative mb-20">
                <div className="container mx-auto pt-20">
                    <div className="mx-2 -mt-12 flex flex-wrap lg:mx-12">
                        {speakers.map((entry) => (
                            <Speaker key={entry.name} {...entry} />
                        ))}
                    </div>
                </div>
            </div>

            <Footer bgColor="white" fgColor="dark" />
        </>
    );
}