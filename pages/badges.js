import { useEffect, useState } from "react";
import { Empty, Row, Col } from "antd";
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
      <Row justify="space-around" align="middle">
        {badges.length !== 0 ? (
          badges.map((badge) => (
            <Col key={badge.id} {...breakpoins}>
              <Badge {...badge} />
            </Col>
          ))
        ) : isLoading ? (
          [...Array(8).keys()].map((key) => (
            <Col key={key} {...breakpoins}>
              <Badge loading />
            </Col>
          ))
        ) : (
          <Empty description="No Badges" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Row>
    </AppLayout>
  );
}

export default withAuth(Badges);
