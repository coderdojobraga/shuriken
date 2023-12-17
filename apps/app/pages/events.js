import { Col, Row, Typography } from "antd";
import AppLayout from "~/layouts/AppLayout";
import { withAuth } from "~/components/Auth";
import Event from "~/components/Event";
import { useEvents } from "~/hooks/events";

import styles from "~/styles/Dashboard.module.css";

const { Title } = Typography;

function Events() {
  const { data: events, isLoading } = useEvents();

  return (
    <AppLayout>
      <Title level={2}>Eventos</Title>
      <Row className={styles.row} align="top" justify="start" gutter={[16, 16]}>
        {events?.map((info) => (
          <Col key={info.id}>
            <Event event={info} loading={isLoading} />
          </Col>
        ))}
      </Row>
    </AppLayout>
  );
}

export default withAuth(Events);
