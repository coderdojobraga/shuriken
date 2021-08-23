const Hero = () => (
  <section className="relative">
    <div className="container mx-auto flex flex-col items-center gap-12 mt-14">
      <div className="flex flex-col flex-1 items-center">
        <h1 className="text-4xl sm:text-5xl text-center font-bold m-4">
          Bem-vindo à página do CoderDojo Braga!
        </h1>
        <h2 className="text-2xl sm:text-3xl font-normal m-4">
          Vais juntar-te a nós?
        </h2>
      </div>
      <div className="flex flex-col sm:flex-row gap-12 -mt-4">
        <button className="bg-primary text-white rounded-3xl px-4 py-2 transform duration-300 hover:scale-110">
          Quero ser Ninja
        </button>
        <button className="bg-dark text-white rounded-3xl px-4 py-2 transform duration-300 hover:scale-110">
          Quero ser Mentor
        </button>
      </div>
    </div>
  </section>
);

export default Hero;
