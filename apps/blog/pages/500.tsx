import ErrorPage from "@coderdojobraga/ui/components/ErrorPage";

const InternalServerError = () => {
  return (
    <ErrorPage status="500" title="Ora bolas! Ocorreu um erro no servidor..." />
  );
};

export default InternalServerError;
