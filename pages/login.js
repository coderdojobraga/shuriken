import { withoutAuth } from "~/components/Auth";
import UnauthenticatedLayout from "~/components/layouts/UnauthenticatedLayout";
import LoginForm from "~/components/Login";

function Login() {
  return (
    <UnauthenticatedLayout>
      <LoginForm />
    </UnauthenticatedLayout>
  );
}

export default withoutAuth(Login);
