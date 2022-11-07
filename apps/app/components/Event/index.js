import Link from "next/link";
import { Button, Card, Descriptions, Grid, Skeleton, Space } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import EventInfo from "~/components/Event/EventInfo";
import { useAuth } from "@coderdojobraga/ui";
import { EUser } from "bokkenjs";

const { useBreakpoint } = Grid;

const Event = ({
  event,
  collapsed = true,
  details = false,
  isLoading = false,
}) => {
  const { user } = useAuth();
  const role = user?.role;

  const screens = useBreakpoint();

  const labelStyle = { color: "rgba(0, 0, 0, 0.45)" };

  const title =
    event?.title ||
    `Sessão ${new Date(event?.start_time).toLocaleDateString("pt", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    })}`;

  const enrollmentsStillOpen = () => {
    const enrollmentsOpen = new Date(event?.enrollments_open);
    const enrollmentsClose = new Date(event?.enrollments_close);
    const nowDate = new Date();

    return enrollmentsOpen < nowDate && enrollmentsClose > nowDate;
  };

  return (
    <>
      {isLoading ? (
        <Skeleton active />
      ) : (
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
                      <CalendarOutlined /> Data
                    </span>
                  }
                >
                  {new Date(event?.start_time).toLocaleString("pt", {
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
                  {event?.location?.name}
                </Descriptions.Item>
                <Descriptions.Item
                  labelStyle={labelStyle}
                  label={
                    <span>
                      <ClockCircleOutlined /> Início
                    </span>
                  }
                >
                  {new Date(event?.start_time).toLocaleString("pt", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </Descriptions.Item>
                <Descriptions.Item
                  labelStyle={labelStyle}
                  label={
                    <span>
                      <ClockCircleOutlined /> Fim
                    </span>
                  }
                >
                  {new Date(event?.end_time).toLocaleString("pt", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </Descriptions.Item>
                <Descriptions.Item
                  labelStyle={labelStyle}
                  label={
                    <span>
                      <HomeOutlined /> Turma
                    </span>
                  }
                >
                  {event?.team?.name}
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <EventInfo {...event} />
            )}
            {role === EUser.Organizer ? (
              <Link href={`/admin/event/${event.id}`}>
                <Button type="primary">Info</Button>
              </Link>
            ) : enrollmentsStillOpen() && !details ? (
              <Link href={`event/${event.id}`}>
                <Button type="primary">Inscrever</Button>
              </Link>
            ) : (
              <></>
            )}
          </Space>
        </Card>
      )}
    </>
  );
};

export default Event;
