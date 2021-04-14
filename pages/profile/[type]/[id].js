import { useRouter } from "next/router";
import ContentLayout from "~/components/layouts/ContentLayout";
import Profile from "~/components/Profile";
import { withAuth } from "~/components/Auth";

function ProfilePage() {
  const router = useRouter();

  const { type, id } = router.query;

  return (
    <ContentLayout>
      <Profile id={id} type={type} />
    </ContentLayout>
  );
}

export default withAuth(ProfilePage);
