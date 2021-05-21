import { withoutAuth } from "~/components/Auth";
import AppLayout from "~/components/layouts/AppLayout";
import RegisterForm from "~/components/Register";

function Register() {
  return (
    <AppLayout hidePrimaryMenu>
      <RegisterForm />
    </AppLayout>
  );
}

export default withoutAuth(Register);
