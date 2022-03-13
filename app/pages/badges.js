import { Col, Empty, Row, Typography } from "antd";
import AppLayout from "@components/layouts/AppLayout";
import withCustomLayout from "@components/layouts/withCustomLayout";
import { withAuth } from "@components/Auth";
import { useBadges } from "@hooks/badges";
import Badge from "@components/Badge";

const breakpoins = {
  xs: 24,
  md: 12,
  xl: 8,
  xxl: 6,
};

const { Title } = Typography;

function Badges() {
  const { data: badges, isLoading } = useBadges();

  if (isLoading) {
    return (
      <Row justify="center" align="middle">
        {[...Array(8).keys()].map((key) => (
          <Col key={key} {...breakpoins}>
            <Badge loading />
          </Col>
        ))}
      </Row>
    );
  }

  if (badges.length === 0) {
    return (
      <Row justify="center" align="middle">
        <Empty
          description="Sem crachás ainda"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </Row>
    );
  }

  return (
    <Row justify="start" align="middle">
      {badges.map((badge) => (
        <Col key={badge.id} {...breakpoins}>
          <Badge {...badge} />
        </Col>
      ))}
    </Row>
  );
}

Badges.getLayout = (page) => (
  <AppLayout>
    <Title level={2}>Os Meus Crachás</Title>
    {page}
  </AppLayout>
);

export default withAuth(withCustomLayout(Badges));
