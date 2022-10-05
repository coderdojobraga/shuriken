import { Footer, Header } from "@coderdojobraga/ui";
import Developer from "components/Developer";
import Mentor from "components/Mentor";
import Communication from "components/Communication";

export default function Recruitment() {
  return (
    <>
      <Header landing={true} />
      <div className="container mx-auto mt-12">
        <h1 className="m-4 text-center text-4xl font-bold sm:text-5xl">
          Junta-te ao CoderDojo Braga!
        </h1>
        <div className="bg-primary h-8/12 mx-auto w-6/12 py-0.5 text-2xl lg:w-5/12" />
        <p className="m-4 pt-6 text-center text-xl font-normal sm:text-xl">
          Contribui para o nosso projeto e faz parte de uma equipa incrivelmente
          dedicada e apaixonada, na qual certamente vais aprender bastante e
          fazer novas amizades. Quer queiras ser mentor e ensinar uma criança a
          programar, quer queiras ser tu a programar e contribuir para as nossas
          plataformas, ou quer queiras ajudar no nosso design e marketing,
          acholher-te-emos de braços abertos.
        </p>
      </div>
      <Mentor />
      <Communication />
      <Developer />
      <Footer bgColor="dark" fgColor="white" />
    </>
  );
}
