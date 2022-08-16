import { useState } from "react";
import {
  Button,
  Card,
  Descriptions,
  Grid,
  Modal,
  Space,
  notification,
} from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import EventInfo from "~/components/Event/EventInfo";
import LinkTo from "~/components/utils/LinkTo";

const { useBreakpoint } = Grid;

const Event = ({ event, collapsed = true }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const screens = useBreakpoint();

  const labelStyle = { color: "rgba(0, 0, 0, 0.45)" };

  const title =
    event.title ||
    `Sessão ${new Date(event.start_time).toLocaleDateString("pt", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    })}`;

  return (
    <LinkTo href={`event/${event.id}`}>
      <Modal
        visible={isPopupVisible}
        title={title}
        onOk={() => setPopupVisible(false)}
        onCancel={() => setPopupVisible(false)}
        width={1000}
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
        style={collapsed ? { maxWidth: 460 } : null}
      >
        <Space
          align="end"
          direction="horizontal"
          wrap={(screens.sm && !screens.md) || screens.xs}
        >
          {collapsed ? (
            <Descriptions size="small" column={1} layout="horizontal">
              <Descriptions.Item
                labelStyle={labelStyle}
                label={
                  <span>
                    <HomeOutlined /> Turma
                  </span>
                }
              >
                {event.team.name}
              </Descriptions.Item>
              <Descriptions.Item
                labelStyle={labelStyle}
                label={
                  <span>
                    <CalendarOutlined /> Data
                  </span>
                }
              >
                {new Date(event.start_time).toLocaleString("pt", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Descriptions.Item>
              <Descriptions.Item
                labelStyle={labelStyle}
                label={
                  <span>
                    <EnvironmentOutlined /> Localização
                  </span>
                }
                span={1}
              >
                {event.location.name}
              </Descriptions.Item>
              <Descriptions.Item
                labelStyle={labelStyle}
                label={
                  <span>
                    <ClockCircleOutlined /> Hora
                  </span>
                }
              >
                {new Date(event.start_time).toLocaleString("pt", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <EventInfo {...event} />
          )}
          <Button
            onClick={() => {
              registerUserOnEvent();
            }}
            type="primary"
          >
            Inscrever
          </Button>
        </Space>
      </Card>
    </LinkTo>
  );
};

export default Event;
