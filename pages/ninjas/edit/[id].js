import { useRouter } from "next/router";

import { withAuth } from "~/components/Auth";
import AppLayout from "~/components/layouts/AppLayout";
import NinjaForm from "~/components/NinjaForm";

function Ninjas() {
  const router = useRouter();

  const { id } = router.query;
  return (
    <AppLayout>
      <NinjaForm id={id} />
    </AppLayout>
  );
}

export default withAuth(Ninjas);
