import { TeamOutlined } from "@ant-design/icons";
import Image from "next/image";

export default function Mentor() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center">
          <div className="ml-auto mr-auto mt-20 w-full px-12 md:w-5/12 md:px-4">
            <div className="bg-primary mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full p-3 text-center text-white shadow-lg">
              <TeamOutlined style={{ fontSize: "150%" }} />
            </div>
            <h3 className="mb-2 text-3xl font-semibold leading-normal text-black">
              Queres ser Mentor?
            </h3>
            <p className="mt-4 mb-4 text-lg font-light leading-relaxed text-black">
              Os Mentores são o coração do CoderDojo Braga. Sem eles, não há
              sessões e não há ninjas a aprender a programar.
            </p>
            <p className="mt-0 mb-4 text-lg font-light leading-relaxed text-black">
              Ao seres mentor, não só estás a ter um impacto positivo na vida
              dos ninjas, como estás a desenvolver as tuas <i>soft skills</i>,
              nomeadamente a forma como comunicas com os outros.
            </p>
            <a
              href=""
              className="bg-primary mt-4 mr-1
                                       mb-1 inline-block rounded-3xl px-6 py-4
                                       text-sm font-bold uppercase text-white shadow outline-none
                                       hover:bg-purple-600 hover:text-white"
            >
              Quero ser Mentor
            </a>
          </div>
          <div className="relative mr-auto ml-auto mt-20 w-6/12 px-4">
            <Image
              alt="Mentores do Dojo"
              src="/img/mentor.jpg"
              layout="fill"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 mb-20">
        <div className="relative z-10 flex flex-wrap justify-center bg-white px-12">
          <div className="w-full lg:w-8/12">
            <h2 className="text-primary text-7xl font-semibold">&quot;</h2>
            <p className="mt-4 mb-4 text-2xl leading-relaxed text-black">
              Enquanto alguém que tem uma enorme paixão por tecnologia, ser
              mentor permite me ser o veículo de aprendizagem para jovens que
              partilham dessa paixão, algo que me realiza particularmente. Além
              disso, aprendi muito e continuo a aprender com aqueles que já cá
              estavam e me receberam de braços abertos.
            </p>
            <h2 className="text-primary text-right text-7xl font-semibold">
              &quot;
            </h2>
            <p className="mb-4 text-2xl leading-relaxed text-black">
              - Filipe Felício, Engenharia Informática
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
