const Hero = () => (
  <section class="relative">
    <div class="container mx-auto flex flex-col items-center gap-12 mt-14">
      <div class="flex flex-col flex-1 items-center">
        <h1 class="text-4xl sm:text-5xl text-center font-bold m-4">
          Bem-vindo à página do CoderDojo Braga!
        </h1>
        <h2 class="text-2xl sm:text-3xl font-normal m-4">
          Vais juntar-te a nós?
        </h2>
      </div>
      <div class="flex flex-col sm:flex-row gap-12 -mt-4">
        <button class="bg-blue-500 text-white rounded-3xl px-4 py-2 transform duration-300 hover:bg-blue-600">
          Quero ser Mentor
        </button>
        <button class="bg-gray-100 text-black rounded-3xl px-4 py-2 transform duration-300 hover:bg-gray-200">
          Quero ser Ninja
        </button>
      </div>
    </div>
  </section>
);

export default Hero;
