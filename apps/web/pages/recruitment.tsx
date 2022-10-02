import { Footer, Header } from "@coderdojobraga/ui";
import Developer from "components/Developer";
import Mentor from "components/Mentor";
import Communication from "components/Communication";

export default function Recruitment() {
  return (
    <>
      <Header landing={true} />
      <div className="mt-12 container mx-auto">
        <h1 className="text-4xl sm:text-5xl text-center font-bold m-4">
          Junta-te ao CoderDojo Braga!
        </h1>
        <div className="py-0.5 mx-auto w-6/12 lg:w-5/12 bg-primary h-8/12 text-2xl" />
        <p className="pt-6 text-center text-xl sm:text-xl font-normal m-4">
          Contribui para o nosso projeto e faz parte de uma equipa incrivelmente
          dedicada e apaixonada, na qual certamente vais aprender bastante e fazer
          novas amizades. Quer queiras ser mentor e ensinar uma criança a programar,
          quer queiras ser tu a programar e contribuir para as nossas plataformas, ou
          quer queiras ajudar no nosso design e marketing, acholher-te-emos de braços 
          abertos.
        </p>
      </div>
      <Mentor />
      <Communication />
      <Developer />
      <Footer bgColor="dark" fgColor="white" />
    </>
  );
}
