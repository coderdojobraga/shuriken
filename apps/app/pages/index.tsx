import { useEffect, useState } from "react";
import { Col, Row, Typography, notification } from "antd";
import { useAuth } from "@coderdojobraga/ui";
import { withAuth } from "~/components/Auth/withAuth";
import AppLayout from "~/layouts/AppLayout";
import Event from "~/components/Event";
import Badge from "~/components/Badge";
import { useBadges } from "~/hooks/badges";
import { EUser, getNinjas } from "bokkenjs";
import Ninja from "~/components/Ninja";
import { useEvents } from "~/hooks/events";

import styles from "~/styles/Dashboard.module.css";

const { Title } = Typography;

function Dashboard() {
  const { user } = useAuth();
  const role = user?.role;

  const [ninjas, setNinjas] = useState([]);
  const { data: events, isLoading: isLoadingEvents } = useEvents();
  const { data: badges, isLoading: isLoadingBadges } = useBadges();

  useEffect(() => {
    if (role === EUser.Guardian) {
      getNinjas()
        .then((response: any) => setNinjas(response.data))
        .catch((error) => notification["error"](error.data?.errors));
    }
  }, [role]);

  return (
    <AppLayout>
      <Title level={2}>Painel Principal</Title>
      <Title level={3}>Próximo Evento</Title>
      <Row className={styles.row} align="top" justify="space-between">
        {events?.length > 0 ? (
          <Event
            event={events[0]}
            collapsed={false}
            isLoading={isLoadingEvents}
          />
        ) : null}
      </Row>
      <Title level={3}>Eventos</Title>
      <Row className={styles.row} align="top" justify="start" gutter={[16, 16]}>
        {events?.slice(0, 3).map((event: any) => (
          <Col key={event.id}>
            <Event event={event} isLoading={isLoadingEvents} />
          </Col>
        ))}
      </Row>
      {role === EUser.Guardian ? (
        <>
          <Title level={3}>Ninjas</Title>
          <Row
            className={styles.row}
            align="top"
            justify="start"
            gutter={[16, 16]}
          >
            {ninjas &&
              ninjas.slice(0, 5).map((ninja: any) => (
                <Col key={ninja.id}>
                  <Ninja {...ninja} />
                </Col>
              ))}
          </Row>
        </>
      ) : (
        <></>
      )}
    </AppLayout>
  );
}

export default withAuth(Dashboard);
