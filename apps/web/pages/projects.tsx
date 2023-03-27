import { Footer, Header } from "@coderdojobraga/ui";
import Event from "~/components/Event";

import projects from "~/data/projects.json";

export default function Projects() {
    return (
        <>
            <Header landing={true} />
            <div className="container mx-auto mt-12">
                <h1 className="m-4 text-center text-4xl font-bold sm:text-5xl">
                    Projetos do CoderDojo Braga
                </h1>
                <div className="bg-primary h-8/12 mx-auto w-6/12 py-0.5 text-2xl lg:w-5/12" />
                <p className="m-4 pt-6 text-center text-xl font-normal sm:text-xl">
                    O Dojo é algo em constante crescimento, de tal maneira que conseguimos desenvolver diversos projetos.
                    Aqui vais poder encontrá-los a todos, tanto as versões mais recentes, como as primeiras iterações.
                </p>
            </div>
            {projects.map((entry) => (
                <Event key={entry.title} {...entry} />
            ))}
            <div className="my-12"></div>
            <Footer bgColor="dark" fgColor="white" />
        </>
    );
}