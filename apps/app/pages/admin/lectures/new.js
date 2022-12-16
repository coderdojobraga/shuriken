import { withAuth } from "~/components/Auth";
import AppLayout from "~/layouts/AppLayout";
import LectureForm from "~/components/LectureForm";

function Ninjas() {
  return (
    <AppLayout>
      <LectureForm />
    </AppLayout>
  );
}

export default withAuth(Ninjas);
