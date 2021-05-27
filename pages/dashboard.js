import AppLayout from "~/components/layouts/AppLayout";
import { withAuth } from "~/components/Auth";

function Dashboard() {
  return <AppLayout>Dashboard</AppLayout>;
}

export default withAuth(Dashboard);
