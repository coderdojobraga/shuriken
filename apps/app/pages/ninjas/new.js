import { withAuth } from "~/components/Auth";
import AppLayout from "~/layouts/AppLayout";
import NinjaForm from "~/components/NinjaForm";

function Ninjas() {
  return (
    <AppLayout>
      <NinjaForm />
    </AppLayout>
  );
}

export default withAuth(Ninjas);
