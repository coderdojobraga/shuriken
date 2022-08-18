import { useEffect, useState } from "react";
import { Typography, Col, Row } from "antd";
import AppLayout from "~/components/layouts/AppLayout";
import { withAuth } from "~/components/Auth";
import Event from "~/components/Event";
import { getEvents } from "~/lib/api";

import styles from "~/styles/Dashboard.module.css";

const { Title } = Typography;

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents()
      .then((response) => setEvents(response.data))
      .catch((error) => notification["error"](error.data?.errors));
  }, []);

  return (
    <AppLayout>
      <Title level={2}>Eventos</Title>
      <Row className={styles.row} align="top" justify="start" gutter={[16, 16]}>
        {events.map((info) => (
          <Col key={info.id}>
            <Event event={info} />
          </Col>
        ))}
      </Row>
    </AppLayout>
  );
}

export default withAuth(Events);
