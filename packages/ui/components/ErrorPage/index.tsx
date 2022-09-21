import { useRouter } from "next/router";
import Image from "next/image";

interface IProps {
  status: string;
  title: string;
  actions?: any;
}

const DefaultActions = () => {
  const router = useRouter();

  return (
    <>
      <button onClick={() => router.back()} key="back">
        Voltar
      </button>
      <button onClick={() => router.push("/")} key="home">
        Página Inicial
      </button>
    </>
  );
};

const ErrorPage = ({ status, title, actions = <DefaultActions /> }: IProps) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div>
        <div className="m-auto block text-center">
          <Image src="/img/logo.svg" width={200} height={200} />
        </div>
        <div className="text-center">
          <h1 className="mt-12 text-3xl font-bold">{title}</h1>
          <h2 className="mt-3 text-xl">Erro {status}</h2>
        </div>
        <div>{actions}</div>
      </div>
    </div>
  );
};

export default ErrorPage;
