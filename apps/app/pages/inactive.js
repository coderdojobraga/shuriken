import { useRouter } from "next/router";
import { Button } from "antd";
import ErrorPage from "@coderdojobraga/ui/components/ErrorPage";

function InactiveActions() {
  const router = useRouter();

  return (
    <>
      <Button
        className="mx-2 border bg-[#722ed1] p-2 text-white"
        onClick={(_) => router.push("/")}
        key="home"
        type="primary"
      >
        Página Inicial
      </Button>
    </>
  );
}

export default function InactiveUser() {
  return (
    <ErrorPage
      status="403"
      title="A tua conta não está ativa! Apenas contas ativas podem aceder à plataforma. Aguarda que um organizador entre em contacto contigo para te dar as boas vindas ao CoderDojo Braga, explicar o nosso funcionamento e ativar a tua conta."
      actions=<InactiveActions />
    />
  );
}
