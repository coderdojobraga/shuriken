import { useRouter } from "next/router";
import { useAuth, withAuth } from "~/components/Auth";
import AppLayout from "~/components/layouts/AppLayout";
import RegisterForm from "~/components/Register";

export async function getStaticProps(context) {
  const res = await fetch(
    "https://raw.githubusercontent.com/coderdojobraga/bokken/main/data/pt/cities.json"
  );
  const cities = await res.json();

  return {
    props: {
      cities,
    },
  };
}

function Register({ cities }) {
  const router = useRouter();
  const { user } = useAuth();

  if (user?.registered) {
    router.replace("/dashboard");
    return null;
  }

  return (
    <AppLayout hidePrimaryMenu>
      <RegisterForm cities={cities} />
    </AppLayout>
  );
}

export default withAuth(Register);
