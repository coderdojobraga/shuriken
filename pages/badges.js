import { Row, Col } from "antd";
import AppLayout from "~/components/layouts/AppLayout";
import { withAuth } from "~/components/Auth";
import Badge from "~/components/Badge";

function Dashboard() {
  return (
    <AppLayout>
      <Row justify="space-around">
        <Col span={6}>
          <Badge />
        </Col>
        <Col span={6}>
          <Badge />
        </Col>
        <Col span={6}>
          <Badge />
        </Col>
        <Col span={6}>
          <Badge />
        </Col>
      </Row>
    </AppLayout>
  );
}

export default withAuth(Dashboard);
