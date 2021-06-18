import { useEffect, useState } from "react";
import { Col, Empty, Row, Space, Typography } from "antd";
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
      <Title level={2}>Os Meus Crachás</Title>
      <Row justify="start" align="middle">
        {badges.length !== 0 ? (
          badges.map((badge) => (
            <Col key={badge.id} {...breakpoins}>
              <Space>
                <Badge {...badge} />
              </Space>
            </Col>
          ))
        ) : isLoading ? (
          [...Array(8).keys()].map((key) => (
            <Col key={key} {...breakpoins}>
              <Space>
                <Badge loading />
              </Space>
            </Col>
          ))
        ) : (
          <Empty
            description="Sem Crachás"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </Row>
    </AppLayout>
  );
}

export default withAuth(Badges);
