import { withoutAuth } from "~/components/Auth";
import AppLayout from "~/components/layouts/AppLayout";
import SignupForm from "~/components/Signup";

function Register() {
  return (
    <AppLayout hidePrimaryMenu>
      <SignupForm />
    </AppLayout>
  );
}

export default withoutAuth(Register);
