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
import { useEvents } from "~/hooks/events";

import styles from "~/styles/Dashboard.module.css";

const { Title } = Typography;

function Dashboard() {
  const { user } = useAuth();
  const role = user.role;

  const [ninjas, setNinjas] = useState([]);
  const { data: events, isLoading: isLoadingEvents } = useEvents();
  const { data: badges, isLoading: isLoadingBadges } = useBadges();

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
      <Title level={3}>Próximo Evento</Title>
      <Row className={styles.row} align="top" justify="space-between">
        {events?.length > 0 ? (
          <Event
            event={events[0]}
            collapsed={false}
            loading={isLoadingEvents}
          />
        ) : null}
      </Row>
      <Title level={3}>Eventos</Title>
      <Row className={styles.row} align="top" justify="start" gutter={[16, 16]}>
        {events?.slice(0, 3).map((event) => (
          <Col key={event.id}>
            <Event event={event} loading={isLoadingEvents} />
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
