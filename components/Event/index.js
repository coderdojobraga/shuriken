import { useState } from "react";
import { Button, Card, Grid, Modal, Space } from "antd";
import EventInfo from "~/components/Event/EventInfo";

import styles from "./style.module.css";

const { useBreakpoint } = Grid;

function Event({ event, collapsed = true }) {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const screens = useBreakpoint();

  const title =
    event.title ||
    `Sessão ${new Date(event.start_time).toLocaleDateString("pt", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    })}`;

  return (
    <>
      <Modal
        visible={isPopupVisible}
        title={title}
        onOk={() => setPopupVisible(false)}
        onCancel={() => setPopupVisible(false)}
      >
        <EventInfo {...event} />
      </Modal>
      <Card
        title={title}
        extra={
          <Button
            style={{ padding: 0 }}
            type="link"
            onClick={() => setPopupVisible(!isPopupVisible)}
          >
            {isPopupVisible ? "Fechar" : "Ver mais"}
          </Button>
        }
        className={styles.card}
        style={collapsed ? { maxWidth: 460 } : null}
      >
        <Space align="end" direction="horizontal" wrap={screens.xs}>
          <EventInfo {...event} />
          <Button type="primary">Inscrever</Button>
        </Space>
      </Card>
    </>
  );
}

export default Event;
