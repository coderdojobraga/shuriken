import { withoutAuth } from "~/components/Auth";
import AuthenticationLayout from "~/layouts/AuthenticationLayout";
import SignupForm from "~/components/Signup";

function Signup() {
  return (
    <AuthenticationLayout>
      <SignupForm />
    </AuthenticationLayout>
  );
}

export default withoutAuth(Signup);
