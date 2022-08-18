import { Descriptions } from "antd";
import {
  AlignLeftOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  HomeOutlined,
} from "@ant-design/icons";

function EventInfo({
  start_time,
  end_time,
  location,
  team,
  notes,
  breakpoints = { xs: 1, sm: 1, md: 1, lg: 7, xl: 7, xxl: 7 },
}) {
  const labelStyle = { color: "rgba(0, 0, 0, 0.45)" };

  return (
    <Descriptions column={breakpoints} size="small" layout="horizontal">
      <Descriptions.Item
        labelStyle={labelStyle}
        label={
          <span>
            <CalendarOutlined /> Data
          </span>
        }
        span={2}
      >
        {new Date(start_time).toLocaleString("pt", {
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
        span={5}
      >
        {location?.name}
      </Descriptions.Item>
      <Descriptions.Item
        labelStyle={labelStyle}
        label={
          <span>
            <ClockCircleOutlined /> Início
          </span>
        }
        span={2}
      >
        {new Date(start_time).toLocaleString("pt", {
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
        span={5}
      >
        {new Date(end_time).toLocaleString("pt", {
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
        span={2}
      >
        {team?.name}
      </Descriptions.Item>
      <Descriptions.Item
        labelStyle={labelStyle}
        label={
          <span>
            <AlignLeftOutlined /> Notas
          </span>
        }
        span={5}
      >
        {notes}
      </Descriptions.Item>
    </Descriptions>
  );
}

export default EventInfo;
