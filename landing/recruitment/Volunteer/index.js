import { PullRequestOutlined } from "@ant-design/icons";

export default function Developer({}) {
  return (
    <section className="bg-dark overflow-hidden">
      <div className="mb-20 container mx-auto ">
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-5/12 px-12 md:px-4 ml-auto mr-auto mt-20">
            <div className="text-dark p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
              <PullRequestOutlined style={{ fontSize: "150%" }} />
            </div>
            <h3 className="text-3xl mb-2 font-semibold leading-normal text-white">
              Contribui para as plataformas Open Source do CoderDojo
            </h3>
            <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              aliquam dui id mattis accumsan. Nullam a ornare lorem, nec
              fermentum lorem.
            </p>
            <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-white">
              Praesent auctor purus sed ante gravida vehicula. Donec ut pretium
              enim. Etiam nec massa augue. Duis semper enim a varius
              sollicitudin. In a maximus magna.
            </p>
            <a
              href=""
              className="mt-4 inline-block text-white
                                       font-bold px-6 py-4 rounded-3xl outline-none
                                       mr-1 mb-1 bg-primary uppercase text-sm shadow
                                       hover:bg-purple-600 hover:text-white"
            >
              Shuriken
            </a>
            <a
              href=""
              className="mt-4 inline-block text-white 
                                       font-bold px-6 py-4 rounded-3xl outline-none
                                       mr-1 mb-1 bg-primary uppercase text-sm shadow
                                       hover:bg-purple-600 hover:text-white"
            >
              Bokken
            </a>
            <a
              href=""
              className="mt-4 inline-block text-white 
                                       font-bold px-6 py-4 rounded outline-none
                                       mr-1 mb-1 uppercase text-sm
                                       hover:text-purple-600"
            >
              Saber Mais
            </a>
          </div>
          <div className="w-6/12 pl-80 pt-20 mr-auto ml-auto mt-20 relative">
            <img
              alt="Code"
              src="img/code.png"
              className="transform scale-150"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 mb-20">
        <div className="flex flex-wrap justify-center px-12 relative z-10">
          <div className="w-full lg:w-8/12">
            <h1 className="font-semibold text-white text-7xl">"</h1>
            <p className="text-white text-2xl leading-relaxed mt-4 mb-4">
              Ser voluntário no CorderDojo é uma experiência muito gratificante,
              pois permite-me apoiar e melhorar uma organização cujas atividades
              têm um efeito positivo profundo e duradouro nos ninjas, mentores e
              voluntários que nelas participam.
            </p>
            <h1 className="font-semibold text-white text-right text-7xl">"</h1>
            <p className="text-white text-2xl leading-relaxed mb-4">
              - Miguel Brandão, Engenharia Informática
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
