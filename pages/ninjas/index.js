import { useEffect, useState } from "react";
import { Button, Card, Row, Typography, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { withAuth } from "~/components/Auth";
import AppLayout from "~/components/layouts/AppLayout";
import LinkTo from "~/components/utils/LinkTo";
import * as api from "~/lib/api";
import Ninja from "~/components/Ninja";

const { Meta } = Card;
const { Title } = Typography;

function Ninjas() {
  const [ninjas, setNinjas] = useState([]);

  useEffect(() => {
    api
      .getNinjas()
      .then((response) => setNinjas(response.data))
      .catch(() => {});
  }, []);

  return (
    <AppLayout>
      <Row justify="space-between">
        <Title level={2}>Os Meus Ninjas</Title>
        <LinkTo href="/ninjas/new">
          <Button
            shape="circle"
            type="primary"
            size="large"
            icon={<PlusOutlined />}
          />
        </LinkTo>
      </Row>
      <Row justify="space-around" gutter={[10, 10]}>
        {ninjas.map((ninja) => (
          <Col key={ninja.id}>
            <Ninja {...ninja} />
          </Col>
        ))}
      </Row>
    </AppLayout>
  );
}

export default withAuth(Ninjas);
