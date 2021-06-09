import { useEffect, useState } from "react";
import { Alert, Button, Space, Typography, Row } from "antd";
import { withAuth } from "~/components/Auth";
import AppLayout from "~/components/layouts/AppLayout";
import Event from "~/components/Event";
import Badge from "~/components/Badge";
import * as api from "~/lib/utils/api";

import styles from "~/styles/Dashboard.module.css";

const { Title, Paragraph } = Typography;

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    api
      .getEvents()
      .then((response) => setEvents(response.data))
      .catch(() => {});

    api
      .getBadges()
      .then((response) => setBadges(response.data))
      .catch(() => {});
  }, []);

  return (
    <AppLayout>
      <Title level={2}>Painel Principal</Title>
      <Paragraph>
        <Alert
          message="Inscrições Abertas"
          description={
            <Space direction="vertical">
              As inscrições para a sessão de 10 de junho de 2021 estão abertas.
              <Button size="small" type="primary">
                Inscrever
              </Button>
            </Space>
          }
          closable
          type="info"
          showIcon
        />
      </Paragraph>
      <Title level={3}>Próximo Evento</Title>
      <Row className={styles.row} align="top" justify="space-between">
        {events.length > 0 ? (
          <Event event={events[0]} collapsed={false} />
        ) : null}
      </Row>
      <Title level={3}>Eventos</Title>
      <Row className={styles.row} align="top" justify="space-between">
        {events.slice(0, 3).map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </Row>
      <Title level={3}>Crachás</Title>
      <Row className={styles.row} align="top" justify="space-between">
        {badges.slice(0, 5).map((badge) => (
          <Badge key={badge.id} {...badge} />
        ))}
      </Row>
    </AppLayout>
  );
}

export default withAuth(Dashboard);
