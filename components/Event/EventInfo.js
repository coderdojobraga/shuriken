import { Descriptions } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  HomeOutlined,
} from "@ant-design/icons";

function EventInfo({ start_time, location, team }) {
  const labelStyle = { color: "rgba(0, 0, 0, 0.45)" };

  return (
    <Descriptions layout="horizontal">
      <Descriptions.Item
        labelStyle={labelStyle}
        label={
          <span>
            <HomeOutlined /> Turma
          </span>
        }
        span={24}
      >
        {team.name}
      </Descriptions.Item>
      <Descriptions.Item
        labelStyle={labelStyle}
        label={
          <span>
            <EnvironmentOutlined /> Localização
          </span>
        }
        span={24}
      >
        {location.name}
      </Descriptions.Item>
      <Descriptions.Item
        labelStyle={labelStyle}
        label={
          <span>
            <CalendarOutlined /> Data
          </span>
        }
        span={24}
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
            <ClockCircleOutlined /> Hora
          </span>
        }
        span={24}
      >
        {new Date(start_time).toLocaleString("pt", {
          hour: "numeric",
          minute: "numeric",
        })}
      </Descriptions.Item>
    </Descriptions>
  );
}

export default EventInfo;
