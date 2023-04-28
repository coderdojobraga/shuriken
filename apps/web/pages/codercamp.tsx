import { Footer, Header } from "@coderdojobraga/ui";
import { MessageFilled, ScheduleOutlined } from "@ant-design/icons";
import Image from "next/image";

const CoderCamp = () => (
  <>
    <Header landing={true} />

    <div className="container mx-auto mt-12">
      <h1
        className="m-4 text-center text-4xl font-bold sm:text-5xl"
        style={{ fontFamily: "Bankai", fontSize: "5rem", lineHeight: "5rem" }}
      >
        Coder Camp
      </h1>
      <div className="bg-primary h-8/12 mx-auto w-6/12 py-0.5 text-2xl lg:w-5/12" />
      <p className="m-4 pt-6 text-center text-3xl font-normal sm:text-3xl">
        03 julho - 07 julho
      </p>
    </div>
    <section className="overflow-hidden bg-white">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center">
          <div className="ml-auto mr-auto mt-20 w-full px-12 md:w-5/12 md:px-4">
            <div className="bg-primary mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full p-3 text-center text-white shadow-lg">
              <ScheduleOutlined style={{ fontSize: "150%" }} />
            </div>
            <h3 className="mb-2 text-3xl font-semibold leading-normal text-black">
              O que é o Coder Camp?
            </h3>
            <p className="mt-4 mb-4 text-lg font-light leading-relaxed text-black">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              vulputate mauris at ornare faucibus. Etiam suscipit condimentum
              nisi id ornare. Sed vehicula maximus est vel vestibulum. Nulla
              ornare elit a urna cursus, sed finibus nunc mollis. Duis et
              elementum leo, sit amet congue felis.
            </p>
            <a
              href=""
              className="bg-primary mt-4 mr-1
                                       mb-1 inline-block rounded-3xl px-6 py-4
                                       text-center text-sm font-bold uppercase text-white shadow
                                       outline-none hover:bg-purple-600 hover:text-white"
            >
              Inscrições abrem em breve
            </a>
          </div>
          <div className="mr-auto ml-auto mt-20 flex w-full items-center justify-center px-4 sm:w-3/4 md:w-6/12">
            <Image
              alt="Mentores do Dojo"
              src="/img/mentor.jpg"
              width={1944}
              height={1296}
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              vulputate mauris at ornare faucibus. Etiam suscipit condimentum
              nisi id ornare. Sed vehicula maximus est vel vestibulum. Nulla
              ornare elit a urna cursus, sed finibus nunc mollis. Duis et
              elementum leo, sit amet congue felis.
            </p>
            <h2 className="text-primary text-right text-7xl font-semibold">
              &quot;
            </h2>
            <p className="mb-4 text-2xl leading-relaxed text-black">
              - Jéssica Fernandes, Champion
            </p>
          </div>
        </div>
      </div>
    </section>
    <section className="bg-primary mt-12 overflow-hidden">
      <div className="container mx-auto mb-20">
        <div className="flex flex-wrap justify-center">
          <div className="ml-auto mr-auto mt-20 w-full px-12 md:w-5/12 md:px-4">
            <div className="text-primary mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
              <MessageFilled style={{ fontSize: "150%" }} />
            </div>
            <h3 className="mb-2 text-3xl font-semibold leading-normal text-white">
              O que vai acontecer no Coder Camp?
            </h3>
            <p className="mt-4 mb-4 text-lg font-light leading-relaxed text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              vulputate mauris at ornare faucibus. Etiam suscipit condimentum
              nisi id ornare. Sed vehicula maximus est vel vestibulum. Nulla
              ornare elit a urna cursus, sed finibus nunc mollis. Duis et
              elementum leo, sit amet congue felis.
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
    <section className="bg-dark overflow-hidden">
      <div className="container mx-auto mb-20 ">
        <div className="flex flex-wrap justify-center">
          <div className="ml-auto mr-auto mt-20 w-full px-12 md:w-5/12 md:px-4">
            <div className="text-dark mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
              <ScheduleOutlined style={{ fontSize: "150%" }} />
            </div>
            <h3 className="mb-2 text-3xl font-semibold leading-normal text-white">
              Horário
            </h3>
            <p className="mt-4 mb-4 text-lg font-light leading-relaxed text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque sodales faucibus quam, eu lobortis enim efficitur
              dictum. Aenean pretium bibendum turpis id posuere. Fusce ut mi nec
              dolor posuere convallis nec venenatis massa. Duis libero dolor,
              pretium sed ornare a, interdum eget enim. Aliquam nec ultrices
              quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Integer a euismod justo, a consequat lectus. Curabitur aliquet
              malesuada lacus.
            </p>
          </div>
          <div className="relative mr-auto ml-auto w-6/12 sm:pl-80 sm:pt-20">
            <div className="flex h-full items-center justify-center">
              <button className="bg-primary items-center justify-center rounded-full px-6 py-2 text-center text-4xl font-bold text-white ">
                A anunciar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer bgColor="dark" fgColor="white" />
  </>
);

export default CoderCamp;
