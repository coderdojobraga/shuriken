import Link from "next/link";

const Hero = () => (
  <section className="relative">
    <div className="container mx-auto mt-14 flex flex-col items-center gap-12">
      <div className="flex flex-1 flex-col items-center">
        <h1 className="m-4 text-center text-4xl font-bold sm:text-5xl">
          Bem-vindo à página do CoderDojo Braga!
        </h1>
        <h2 className="m-4 text-2xl font-normal sm:text-3xl">
          Vais juntar-te a nós?
        </h2>
      </div>
      <div className="-mt-4 flex flex-col gap-12 sm:flex-row">
        <a href="https://forms.gle/PhHEYZhEjKnqPb6h7">
          <button className="bg-primary transform rounded-3xl px-4 py-2 text-white duration-300 hover:scale-110">
            Quero ser Ninja
          </button>
        </a>
        <Link href="/recruitment">
          <button className="bg-dark transform rounded-3xl px-4 py-2 text-white duration-300 hover:scale-110">
            Quero ser Voluntário
          </button>
        </Link>
      </div>
    </div>
  </section>
);

export default Hero;
