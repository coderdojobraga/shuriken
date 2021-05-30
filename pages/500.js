import ErrorPage from "~/components/ErrorPage";

export default function InternalServerError() {
  return (
    <ErrorPage status="500" title="Ora bolas! Ocorreu um erro no servidor..." />
  );
}
