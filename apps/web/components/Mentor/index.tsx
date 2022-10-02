import { TeamOutlined } from "@ant-design/icons";

export default function Mentor() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-5/12 px-12 md:px-4 ml-auto mr-auto mt-20">
            <div className="text-white p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-primary">
              <TeamOutlined style={{ fontSize: "150%" }} />
            </div>
            <h3 className="text-3xl mb-2 font-semibold leading-normal text-black">
              Queres ser Mentor?
            </h3>
            <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-black">
              Os Mentores são o coração do CoderDojo Braga. Sem eles, não há sessões
              e não há ninjas a aprender a programar.
            </p>
            <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-black">
              Ao seres mentor, não só estás a ter um impacto positivo na vida dos 
              ninjas, como estás a desenvolver as tuas <i>soft skills</i>, nomeadamente
              a forma como comunicas com os outros.
            </p>
            <a
              href=""
              className="mt-4 inline-block text-white
                                       font-bold px-6 py-4 rounded-3xl outline-none
                                       mr-1 mb-1 bg-primary uppercase text-sm shadow
                                       hover:bg-purple-600 hover:text-white"
            >
              Quero ser Mentor
            </a>
          </div>
          <div className="w-6/12 px-4 mr-auto ml-auto mt-20 relative">
            <img
              alt="Mentores do Dojo"
              src="img/mentor.jpg"
              className="shadow-2xl rounded-2xl"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 mb-20">
        <div className="flex flex-wrap justify-center bg-white px-12 relative z-10">
          <div className="w-full lg:w-8/12">
            <h1 className="font-semibold text-primary text-7xl">"</h1>
            <p className="text-black text-2xl leading-relaxed mt-4 mb-4">
              Enquanto alguém que tem uma enorme paixão por tecnologia, ser
              mentor permite me ser o veículo de aprendizagem para jovens que
              partilham dessa paixão, algo que me realiza particularmente. Além
              disso, aprendi muito e continuo a aprender com aqueles que já cá
              estavam e me receberam de braços abertos.
            </p>
            <h1 className="font-semibold text-primary text-right text-7xl">
              "
            </h1>
            <p className="text-black text-2xl leading-relaxed mb-4">
              - Filipe Felício, Engenharia Informática
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}