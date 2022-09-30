import { useRouter } from "next/router";
import ErrorPage from "@coderdojobraga/ui/components/ErrorPage";
import { withAuth } from "~/components/Auth";

function InactiveActions() {
  const router = useRouter();

  return (
    <div className="m-auto mt-5 px-4">
      <div className="m-auto block w-fit">
        <button
          className="mx-2 border bg-[#722ed1] p-2 text-white"
          onClick={(_) => router.push("/")}
          key="home"
          type="primary"
        >
          Página Inicial
        </button>
      </div>
    </div>
  );
}

function InactiveUser() {
  return (
    <ErrorPage
      status="403"
      title="A conta não está ativa!"
      subtitle="Apenas contas ativas podem aceder à plataforma. Aguarda que um organizador entre em contacto contigo para te dar as boas vindas ao CoderDojo Braga, explicar o nosso funcionamento e ativar a tua conta."
      actions=<InactiveActions />
    />
  );
}

export default withAuth(InactiveUser);
