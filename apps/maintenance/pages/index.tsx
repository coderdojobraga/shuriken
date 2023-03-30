import Image from "next/image";
import React from "react";

const MaintenancePage = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-300"></div>
      </div>
      <div className="relative z-10">
        <div className="grid h-screen grid-cols-1 md:grid-cols-2">
          <div className="flex items-center justify-center p-4">
            <section className="dark:bg-gray-900 sm:pl-10 md:pl-20 lg:pl-36">
              <div className="mx-auto max-w-screen-md py-8 px-4 text-center lg:py-16 lg:px-12">
                <svg
                  className="mx-auto mb-4 h-10 w-10 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M331.8 224.1c28.29 0 54.88 10.99 74.86 30.97l19.59 19.59c40.01-17.74 71.25-53.3 81.62-96.65c5.725-23.92 5.34-47.08 .2148-68.4c-2.613-10.88-16.43-14.51-24.34-6.604l-68.9 68.9h-75.6V97.2l68.9-68.9c7.912-7.912 4.275-21.73-6.604-24.34c-21.32-5.125-44.48-5.51-68.4 .2148c-55.3 13.23-98.39 60.22-107.2 116.4C224.5 128.9 224.2 137 224.3 145l82.78 82.86C315.2 225.1 323.5 224.1 331.8 224.1zM384 278.6c-23.16-23.16-57.57-27.57-85.39-13.9L191.1 158L191.1 95.99l-127.1-95.99L0 63.1l96 127.1l62.04 .0077l106.7 106.6c-13.67 27.82-9.251 62.23 13.91 85.39l117 117.1c14.62 14.5 38.21 14.5 52.71-.0016l52.75-52.75c14.5-14.5 14.5-38.08-.0016-52.71L384 278.6zM227.9 307L168.7 247.9l-148.9 148.9c-26.37 26.37-26.37 69.08 0 95.45C32.96 505.4 50.21 512 67.5 512s34.54-6.592 47.72-19.78l119.1-119.1C225.5 352.3 222.6 329.4 227.9 307zM64 472c-13.25 0-24-10.75-24-24c0-13.26 10.75-24 24-24S88 434.7 88 448C88 461.3 77.25 472 64 472z"
                  />
                </svg>
                <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 dark:text-white md:text-4xl lg:mb-6 lg:text-5xl xl:text-6xl">
                  O nosso site está em manutenção.
                </h1>
                <p className="text-base font-light text-white dark:text-gray-400 md:text-lg lg:text-xl">
                  Pedimos desculpa por qualquer inconveniente e obrigado pela
                  sua paciência.
                </p>
                <p className="hidden text-base font-light text-white dark:text-gray-400 md:block md:text-lg lg:text-xl">
                  Clique no dinossauro e dê o seu melhor!
                </p>
                <p className="text-base font-light text-white dark:text-gray-400 md:text-lg lg:text-xl">
                  Estaremos de volta em breve!
                </p>
                <div className="pt-26">
                  <iframe
                    src="/chrome-dino-game/index.html"
                    title="Chrome Dino Game"
                    style={{ width: "100%", height: "300px", border: "none" }}
                    className="hidden md:block"
                  ></iframe>
                </div>
              </div>
            </section>
          </div>
          <div className="flex items-center justify-center p-4">
            <div className="mx-auto max-w-xs md:max-w-full">
              <Image
                src="/img/logo.svg"
                width={400}
                height={400}
                alt="logo"
                className="animate-spin"
                style={{ animationDuration: "14s" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
