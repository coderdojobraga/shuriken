import { useRouter } from "next/router";
import AppLayout from "~/components/layouts/AppLayout";
import Profile from "~/components/Profile";
import { withAuth } from "~/components/Auth";

function ProfilePage() {
  const router = useRouter();

  const { type, id } = router.query;

  return (
    <AppLayout>
      <Profile id={id} type={type} />
    </AppLayout>
  );
}

export default withAuth(ProfilePage);
