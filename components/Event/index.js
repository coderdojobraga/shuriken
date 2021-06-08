import { Button, Card, Descriptions, Space, Typography } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  HomeOutlined,
} from "@ant-design/icons";

function Event() {
  const labelStyle = { color: "rgba(0, 0, 0, 0.45)" };

  return (
    <Card
      title="Especial de Natal"
      extra={<a href="#">Ver mais</a>}
      style={{ maxWidth: 400 }}
    >
      <Space align="end" direction="horizontal">
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
            Yin
          </Descriptions.Item>
          <Descriptions.Item
            labelStyle={labelStyle}
            label={
              <span>
                <EnvironmentOutlined />
                Localização
              </span>
            }
            span={24}
          >
            Discord
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
            21/06/2021
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
            10h00
          </Descriptions.Item>
        </Descriptions>
        <Button type="primary">Inscrever</Button>
      </Space>
    </Card>
  );
}

export default Event;
