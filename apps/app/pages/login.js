import { withoutAuth } from "~/components/Auth";
import AuthenticationLayout from "~/layouts/AuthenticationLayout";
import LoginForm from "~/components/Login";

function Login() {
  return (
    <AuthenticationLayout>
      <LoginForm />
    </AuthenticationLayout>
  );
}

export default withoutAuth(Login);
