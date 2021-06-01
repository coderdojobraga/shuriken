import { useRouter } from "next/router";
import { useAuth, withAuth } from "~/components/Auth";
import AppLayout from "~/components/layouts/AppLayout";
import RegisterForm from "~/components/Register";

function Register() {
  const router = useRouter();
  const { user } = useAuth();

  if (user?.registered) {
    router.replace("/dashboard");
    return null;
  }

  return (
    <AppLayout hidePrimaryMenu>
      <RegisterForm />
    </AppLayout>
  );
}

export default withAuth(Register);
