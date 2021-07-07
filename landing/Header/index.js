function Header() {
  return (
    <header>
      <nav class="container mx-auto flex items-center p-3 mt-4">
        <div class="py-2">
          <img class="w-48" src="/img/logo-lettering.png" />
        </div>
        <ul class="hidden md:flex flex-1 justify-end items-center gap-12 text-black text-sm uppercase">
          <li class="cursor-pointer hover:text-blue-500">Currículo</li>
          <li class="cursor-pointer hover:text-blue-500">Projetos</li>
          <li class="cursor-pointer hover:text-blue-500">Equipa</li>
          <button
            type="button"
            class="bg-blue-500 text-white rounded-3xl px-4 py-2 transform duration-300 uppercase hover:bg-blue-600"
          >
            Login
          </button>
        </ul>
        <div class="flex md:hidden flex-1 justify-end px-2">
          <button
            type="button"
            class="bg-blue-500 text-white inline-flex items-center justify-center p-2 transform duration-300 rounded-md hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            {/* <!-- open icon --> */}
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            {/* <!-- close icon --> */}
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
