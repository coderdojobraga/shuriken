import Image from "next/image";

const Belt = ({ colour, description, image, requirements }: any) => {
  return (
    <div className="container mx-auto">
      <section id={colour} className="relative mx-2 md:my-28 lg:mx-12 xl:mx-20">
        <div className="my-8 flex flex-row items-center py-2 ">
          <div className="block">
            <h2 className="py-2 text-2xl font-semibold sm:text-3xl">
              <span className="mr-1 text-2xl text-purple-500 sm:text-3xl">
                |
              </span>
              Cinturão {colour}
            </h2>
            <p className="text-md mt-4 md:mr-36">{description}</p>
            <p className="mt-6 font-semibold">Requisitos:</p>
            <ul className="sm:text-md mt-2 list-disc pl-4 text-sm">
              {requirements.map((r: any) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <div className="ml-auto">
            <div className="block h-48 w-48">
              <Image
                src={`/img/ninjas/${image}`}
                width={300}
                height={300}
                alt={colour}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Belt;
