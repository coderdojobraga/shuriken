import { useRouter } from "next/router";
import AppLayout from "~/layouts/AppLayout";
import Profile from "~/components/Profile";
import { withAuth } from "~/components/Auth";
import { EUser } from "bokkenjs";

function ProfilePage() {
  const router = useRouter();

  const { id, role } = router.query;

  return (
    <AppLayout>
      <Profile id={id as string} role={role as EUser} />
    </AppLayout>
  );
}

export default withAuth(ProfilePage);
