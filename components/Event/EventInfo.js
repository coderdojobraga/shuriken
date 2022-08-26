import { Descriptions } from "antd";
import {
  AlignLeftOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

function EventInfo({
  start_time,
  end_time,
  location,
  team,
  notes,
  enrollments_open,
  enrollments_close,
  breakpoints = { xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 6 },
}) {
  const labelStyle = { color: "rgba(0, 0, 0, 0.45)", maxWidth: "30vw" };

  const timeForEnrollmentsClose = () => {
    const enrollmentsClose = new Date(enrollments_close).getTime();
    const nowDate = new Date().getTime();
    const timeDiff = (enrollmentsClose - nowDate) / (1000 * 60 * 60 * 24);

    return timeDiff > 0 && timeDiff < 1; // Difference of less than a day
  };

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
      <Descriptions.Item
        labelStyle={labelStyle}
        label={
          <span>
            <CheckCircleOutlined /> Abertura das inscrições
          </span>
        }
        span={2}
      >
        {new Date(enrollments_open).toLocaleDateString("pt", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </Descriptions.Item>
      <Descriptions.Item
        labelStyle={labelStyle}
        label={
          timeForEnrollmentsClose() ? (
            <span className="text-yellow-600 animate-bounce">
              <CloseCircleOutlined /> Fecho das inscrições
            </span>
          ) : (
            <span>
              <CloseCircleOutlined /> Fecho das inscrições
            </span>
          )
        }
        span={2}
      >
        {new Date(enrollments_close).toLocaleDateString("pt", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </Descriptions.Item>
    </Descriptions>
  );
}

export default EventInfo;
