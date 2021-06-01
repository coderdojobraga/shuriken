import ErrorPage from "~/layouts/ErrorPage";

export default function InternalServerError() {
  return (
    <ErrorPage status="500" title="Ora bolas! Ocorreu um erro no servidor..." />
  );
}
