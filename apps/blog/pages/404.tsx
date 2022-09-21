import ErrorPage from "@coderdojobraga/ui/components/ErrorPage";

const NotFound = () => {
  return (
    <ErrorPage status="404" title="Ups! Esta página não existe." actions={[]} />
  );
};

export default NotFound;
