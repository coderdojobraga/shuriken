import { Alert, Button, Space, Typography, Row } from "antd";
import AppLayout from "~/components/layouts/AppLayout";
import { withAuth } from "~/components/Auth";
import Event from "~/components/Event";

const { Title, Paragraph } = Typography;

function Dashboard() {
  return (
    <AppLayout>
      <Title level={2}>Painel Principal</Title>
      <Paragraph>
        <Alert
          message="Inscrições Abertas"
          description={
            <Space direction="vertical">
              As inscrições para a sessão de 10 de junho de 2021 estão abertas.
              <Button size="small" type="primary">
                Inscrever
              </Button>
            </Space>
          }
          closable
          type="info"
          showIcon
        />
      </Paragraph>
      <Title level={3}>Próximo Evento</Title>
      <Paragraph>
        <Event />
      </Paragraph>
      <Title level={3}>Eventos</Title>
      <Row align="top" justify="space-between">
        <Event />
        <Event />
        <Event />
      </Row>
    </AppLayout>
  );
}

export default withAuth(Dashboard);
