const Footer = () => (
  <footer class="bg-blue-500 text-white py-8 mt-16">
    <div class="container mx-auto flex flex-col items-center">
      <ul class="flex  flex-row items-center gap-2 sm:gap-6 m-5">
        <li class="cursor-pointer hover:text-blue-100">Currículo</li>
        <span class="text-black">|</span>
        <li class="cursor-pointer hover:text-blue-100">Projetos</li>
        <span class="text-black">|</span>
        <li class="cursor-pointer hover:text-blue-100">Equipa</li>
        <span class="text-black">|</span>
        <li class="cursor-pointer hover:text-blue-100">Sessões</li>
      </ul>
      <div class="flex flex-row items-center gap-12 m-5">
        <img src="img/social/facebook.svg" />
        <img src="img/social/instagram.svg" />
        <img src="img/social/twitter.svg" />
        <img src="img/social/github.svg" />
      </div>
      <p class="m-5">&copy; 2021 CoderDojo Braga.</p>
    </div>
  </footer>
);

export default Footer;
