import { useEffect, useState } from "react";
import { Alert, Button, Space, Typography, Col, Row, notification } from "antd";
import { useAuth, withAuth } from "~/components/Auth";
import AppLayout from "~/components/layouts/AppLayout";
import Event from "~/components/Event";
import Badge from "~/components/Badge";
import { useBadges } from "~/hooks/badges";
import * as USER from "~/lib/user";
import { getEvents, getNinjas } from "~/lib/api";
import Ninja from "~/components/Ninja";

import styles from "~/styles/Dashboard.module.css";

const { Title, Paragraph } = Typography;

function Dashboard() {
  const { user } = useAuth();
  const role = user.role;

  const [events, setEvents] = useState([]);
  const [ninjas, setNinjas] = useState([]);

  const { data: badges, isLoading: isLoadingBadges } = useBadges();

  useEffect(() => {
    getEvents()
      .then((response) => setEvents(response.data))
      .catch((error) => notification["error"](error.data?.errors));
  }, []);

  useEffect(() => {
    if (role === USER.ROLES.GUARDIAN) {
      getNinjas()
        .then((response) => setNinjas(response.data))
        .catch((error) => notification["error"](error.data?.errors));
    }
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
      <Row className={styles.row} align="top" justify="start" gutter={[16, 16]}>
        {events.slice(0, 3).map((event) => (
          <Col key={event.id}>
            <Event event={event} />
          </Col>
        ))}
      </Row>
      {role === USER.ROLES.GUARDIAN ? (
        <>
          <Title level={3}>Ninjas</Title>
          <Row
            className={styles.row}
            align="top"
            justify="start"
            gutter={[16, 16]}
          >
            {ninjas &&
              ninjas.slice(0, 5).map((ninja) => (
                <Col key={ninja.id}>
                  <Ninja {...ninja} />
                </Col>
              ))}
          </Row>
        </>
      ) : (
        <>
          <Title level={3}>Crachás</Title>
          <Row
            className={styles.row}
            align="top"
            justify="start"
            gutter={[16, 16]}
          >
            {badges &&
              badges.slice(0, 5).map((badge) => (
                <Col key={badge.id}>
                  <Badge {...badge} loading={isLoadingBadges} />
                </Col>
              ))}
          </Row>
        </>
      )}
    </AppLayout>
  );
}

export default withAuth(Dashboard);
