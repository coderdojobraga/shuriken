import ErrorPage from "~/layouts/ErrorPage";

export default function NotFound() {
  return <ErrorPage status="404" title="Ups! Esta página não existe." />;
}
