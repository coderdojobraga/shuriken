import { useEffect, useState } from "react";
import { Alert, Button, Space, Typography, Col, Row } from "antd";
import { withAuth } from "~/components/Auth";
import AppLayout from "~/components/layouts/AppLayout";
import Event from "~/components/Event";
import Badge from "~/components/Badge";
import { useBadges } from "~/hooks/badges";
import * as api from "~/lib/api";

import styles from "~/styles/Dashboard.module.css";

const { Title, Paragraph } = Typography;

function Dashboard() {
  const [events, setEvents] = useState([]);
  const { data: badges, isLoading: isLoadingBadges } = useBadges();

  useEffect(() => {
    api
      .getEvents()
      .then((response) => setEvents(response.data))
      .catch(() => {});
  }, []);

  return (
    <AppLayout>
      <Title level={2}>Painel Principal</Title>
      <Title level={3}>Próximo Evento</Title>
      <Row className={styles.row} align="top" justify="space-between">
        {events.length > 0 ? (
          <Event event={events[0]} collapsed={false} />
        ) : null}
      </Row>
      <Title level={3}>Eventos</Title>
      <Row className={styles.row} align="top" justify="start" gutter={[16, 16]}>
        {events.slice(0, 3).map((event) => (
          <Col key={event.id}>
            <Event event={event} />
          </Col>
        ))}
      </Row>
      <Title level={3}>Crachás</Title>
      <Row className={styles.row} align="top" justify="start" gutter={[16, 16]}>
        {badges &&
          badges.slice(0, 5).map((badge) => (
            <Col key={badge.id}>
              <Badge {...badge} />
            </Col>
          ))}
      </Row>
    </AppLayout>
  );
}

export default withAuth(Dashboard);
