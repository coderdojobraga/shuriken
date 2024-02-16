import { Footer, Header } from "@coderdojobraga/ui";
import { MessageFilled, ScheduleOutlined } from "@ant-design/icons";
import Image from "next/image";

import schedule from "../data/coder_camp_schedule.json"

const CoderCamp = () => (
  <>
    <Header landing={true} />

    <div className="container mx-auto mt-12">
      <h1
        className="m-4 text-center text-4xl font-bold sm:text-5xl"
        style={{ fontFamily: "Bankai", fontSize: "5rem", lineHeight: "5rem" }}
      >
        Coder Camp &apos; 23
      </h1>
      <div className="bg-primary h-8/12 mx-auto w-6/12 py-0.5 text-2xl lg:w-5/12" />
      <p className="m-4 pt-6 text-center text-3xl font-normal sm:text-3xl">
        03 julho - 07 julho
      </p>
    </div>
    <section className="overflow-hidden bg-white">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-center">
          <div className="ml-auto mr-auto mt-20 w-full px-12 md:w-5/12 md:px-4">
            <div className="bg-primary mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full p-3 text-center text-white shadow-lg">
              <ScheduleOutlined style={{ fontSize: "150%" }} />
            </div>
            <h3 className="mb-2 text-3xl font-semibold leading-normal text-black">
              O que é o Coder Camp?
            </h3>
            <p className="mt-4 mb-4 text-lg font-light leading-relaxed text-black">
              O Coder Camp, organizado pelo CoderDojo Braga, é uma semana
              dedicada a atividades lúdicas no âmbito da programação, realizada
              entre os dias 3 a 7 de julho. Esta iniciativa promove a
              aprendizagem da programação num contexto informal e de convívio,
              na companhia de outros Ninjas e dos nossos Mentores.
            </p>
          </div>
          <div className="mr-auto ml-auto mt-20 flex w-full items-center justify-center px-4 sm:w-3/4 md:w-6/12">
            <Image
              alt="Coder Camp"
              src="/img/codercamp.png"
              width={789}
              height={789}
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
    <section className="bg-dark mt-12 overflow-hidden">
      <div className="container mx-auto mb-20">
        <div className="flex flex-wrap items-center justify-center">
          <div className="ml-auto mr-auto mt-20 w-full px-12 md:w-5/12 md:px-4">
            <div className="text-dark mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
              <MessageFilled style={{ fontSize: "150%" }} />
            </div>
            <h3 className="mb-2 text-3xl font-semibold leading-normal text-white">
              O que vai acontecer no Coder Camp?
            </h3>
            <p className="mt-4 mb-4 text-lg font-light leading-relaxed text-white">
              Vamos ter sessões dedicadas à programação em Python e Scratch,
              assim como diversos jogos, atividades de convívio e robôs! O
              objetivo é criar e desenvolver projetos num ambiente descontraído
              e promover a interação entre todos os participantes.
            </p>
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
    </section>
    <section className="bg-primary overflow-hidden">
      <div className="container mx-auto mb-20 ">
        <div className="flex flex-wrap items-center justify-center">
          <div className="mx-auto mt-20 w-full px-12 md:w-5/12 md:px-4">
            <div className="text-primary mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
              <ScheduleOutlined style={{ fontSize: "150%" }} />
            </div>
            <h3 className="mb-2 text-3xl font-semibold leading-normal text-white">
              Horário
            </h3>
            <p className="mt-4 mb-4 text-lg font-light leading-relaxed text-white">
              A equipa por detrás do Coder Camp preparou as melhores atividades
              para uma semana recheada de diversão!
            </p>
          </div>
          <div className="ml-auto mr-auto mt-20 w-full px-12 md:w-5/12 md:px-4">
          </div>

          <div className="mx-auto px-12 lg:px-4 lg:mt-12 w-full flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-4">
            {schedule.map(day => (
            <div className="w-full lg:w-1/5">
              <p className="text-white text-2xl font-semibold">
                {day.name}
              </p>
              <div className="mt-6 space-y-8 bg-white/20 px-4 py-14 text-center shadow-xl shadow-primary/5 backdrop-blur">

              <ol role="list" className="px-6 text-center divide-y divide-white/20">
                {day.activities.map(activity => (
                  <li className="py-8">
                    <h4 className="text-lg truncate uppercase font-semibold tracking-tight text-white/90">
                      {activity.title}
                    </h4>

                    <p className="mt-1 font-mono text-sm text-white/60">
                      <span>{activity.hours}</span>
                    </p>
                  </li>
                ))}
              </ol>
                
              </div>
            </div>))}

          </div>
          
        
        </div>
      </div>
    </section>
    <Footer bgColor="primary" fgColor="white" />
  </>
);

export default CoderCamp;
