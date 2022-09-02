import ErrorPage from "~/layouts/ErrorPage";

export default function InactiveUser() {
  return (
    <ErrorPage
      status="403"
      title="A tua conta não está ativa! Apenas contas ativas podem aceder à plataforma. Aguarda que um organizador entre em contacto contigo para te dar as boas vindas ao CoderDojo Braga, explicar o nosso funcionamento e ativar a tua conta."
    />
  );
}
