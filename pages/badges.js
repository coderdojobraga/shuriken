import { useEffect, useState } from "react";
import { Col, Empty, Row, Typography } from "antd";
import AppLayout from "~/components/layouts/AppLayout";
import { withAuth } from "~/components/Auth";
import Badge from "~/components/Badge";
import * as api from "~/lib/api";

const breakpoins = {
  xs: 24,
  md: 12,
  xl: 8,
  xxl: 6,
};

const { Title } = Typography;

const Content = ({ isLoading, badges }) => {
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
};

function Badges() {
  const [badges, setBadges] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .getBadges()
      .then((response) => setBadges(response.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppLayout>
      <Title level={2}>Os Meus Crachás</Title>
      <Content isLoading={isLoading} badges={badges} />
    </AppLayout>
  );
}

export default withAuth(Badges);
