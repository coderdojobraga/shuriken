import { useRouter } from "next/router";
import Image from "next/image";

interface IProps {
  status: string;
  title: string;
  subtitle: string;
  actions?: any;
}

const DefaultActions = () => {
  const router = useRouter();

  return (
    <div className="m-auto mt-5">
      <div className="m-auto block w-fit">
        <button
          className="mx-2 border p-2"
          onClick={() => router.back()}
          key="back"
        >
          Voltar
        </button>
        <button
          className="mx-2 border bg-[#722ed1] p-2 text-white"
          onClick={() => router.push("/")}
          key="home"
        >
          Página Inicial
        </button>
      </div>
    </div>
  );
};

const MaintenancePage = ({
  status,
  title,
  subtitle = "",
  actions = <DefaultActions />,
}: IProps) => {
  return (
    <div className="m-auto flex h-screen max-w-screen-md items-center justify-center">
      <div>
        <div className="m-auto block text-center">
          <Image src="/img/logo.svg" width={200} height={200} />
        </div>
        <div className="text-center">
          <h1 className="text-md mt-12 font-bold sm:text-3xl">{title}</h1>
          <p className="mt-6 text-sm sm:text-lg">{subtitle}</p>
          <h2 className="mt-3 text-sm sm:text-xl">Erro {status}</h2>
        </div>
        <div>{actions}</div>
      </div>
    </div>
  );
};

export default MaintenancePage;
