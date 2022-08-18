import { Button, Card, Descriptions, Grid, Space } from "antd";
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
    <Card title={title} style={collapsed ? { maxWidth: 460 } : null}>
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
        <LinkTo href={`event/${event.id}`}>
          <Button type="primary"> Inscrever </Button>
        </LinkTo>
      </Space>
    </Card>
  );
};

export default Event;
