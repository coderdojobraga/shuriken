import { withAuth } from "~/components/Auth";
import AppLayout from "~/layouts/AppLayout";
import LectureForm from "~/components/LectureForm";
import { useRouter } from "next/router";

function NewLecture() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <AppLayout>
      <LectureForm id={id} />
    </AppLayout>
  );
}

export default withAuth(NewLecture);
