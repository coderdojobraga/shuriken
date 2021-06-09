import { useEffect, useState } from "react";
import { Typography, Row } from "antd";
import AppLayout from "~/components/layouts/AppLayout";
import { withAuth } from "~/components/Auth";
import Event from "~/components/Event";
import * as api from "~/lib/utils/api";

import styles from "~/styles/Dashboard.module.css";

const { Title } = Typography;

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api
      .getEvents()
      .then((response) => setEvents(response.data))
      .catch(() => {});
  }, []);

  return (
    <AppLayout>
      <Title level={2}>Eventos</Title>
      <Row className={styles.row} align="top" justify="space-between">
        {events.map((info) => (
          <Event key={info.id} event={info} />
        ))}
      </Row>
    </AppLayout>
  );
}

export default withAuth(Events);
