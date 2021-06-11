import { useEffect, useState } from "react";
import { Col, Empty, Row, Typography } from "antd";
import AppLayout from "~/components/layouts/AppLayout";
import { withAuth } from "~/components/Auth";
import Badge from "~/components/Badge";
import * as api from "~/lib/utils/api";

const breakpoins = {
  xs: 24,
  md: 12,
  xl: 8,
  xxl: 6,
};

const { Title } = Typography;

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
      <Title level={2}>Os meus Crachás</Title>
      {badges.length !== 0 ? (
        <Row justify="start" align="middle">
          {badges.map((badge) => (
            <Col key={badge.id} {...breakpoins}>
              <Badge {...badge} />
            </Col>
          ))}
        </Row>
      ) : isLoading ? (
        [...Array(8).keys()].map((key) => (
          <Row key={key} justify="start" align="middle">
            <Col {...breakpoins}>
              <Badge loading />
            </Col>
          </Row>
        ))
      ) : (
        <Row justify="center" align="middle">
          <Empty
            description="Sem crachás ainda"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </Row>
      )}
    </AppLayout>
  );
}

export default withAuth(Badges);
