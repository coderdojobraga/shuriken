import { MessageFilled } from "@ant-design/icons";
import Image from "next/image";

export default function Communication() {
  return (
    <section className="bg-primary mt-12 overflow-hidden">
      <div className="container mx-auto mb-20">
        <div className="flex flex-wrap justify-center">
          <div className="ml-auto mr-auto mt-20 w-full px-12 md:w-5/12 md:px-4">
            <div className="text-primary mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
              <MessageFilled style={{ fontSize: "150%" }} />
            </div>
            <h3 className="mb-2 text-3xl font-semibold leading-normal text-white">
              Queres ajudar com Design e Marketing?
            </h3>
            <p className="mt-4 mb-4 text-lg font-light leading-relaxed text-white">
              O design e marketing são essenciais para o CoderDojo Braga, pois
              permitem expandir a nossa atuação, dando-nos a conhecer a mais
              pessoas, sejam novos guardiões e ninjas, ou mentores e
              voluntários.
            </p>
            <p className="mt-0 mb-4 text-lg font-light leading-relaxed text-white">
              Junta-te à nossa equipa, e contribuir para tornar este projeto
              nalgo cada vez maior e melhor.
            </p>
            <a
              href="https://forms.gle/2e3DUeorMrxYdANz7"
              className="text-primary hover:text-primary mt-4 
                                       mr-1 mb-1 inline-block rounded-3xl bg-white
                                       px-6 py-4 text-sm font-bold uppercase shadow
                                       outline-none hover:bg-purple-100"
            >
              Quero ajudar com Design e Marketing
            </a>
          </div>
          <div className="relative mr-auto ml-auto w-6/12 pl-80 pt-20">
            <Image
              alt="Half Logo"
              src="/img/half_logo.svg"
              width={300}
              height={398}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 mb-20">
        <div className="relative z-10 flex flex-wrap justify-center px-12">
          <div className="w-full lg:w-8/12">
            <h2 className="text-7xl font-semibold text-white">&quot;</h2>
            <p className="mt-4 mb-4 text-2xl leading-relaxed text-white">
              É realmente fantástico fazer parte de um projeto que tanto tem
              crescido nos últimos anos e poder ajudá-lo a chegar ainda mais
              longe. Integrar a equipa de Comunicação e Marketing do Dojo tem-me
              permitido ganhar experiência prática na minha área e aprender
              imenso com os restantes mentores e voluntários.
            </p>
            <h2 className="text-right text-7xl font-semibold text-white">
              &quot;
            </h2>
            <p className="mb-4 text-2xl leading-relaxed text-white">
              - Francisco Alves, Ciências da Comunicação
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
