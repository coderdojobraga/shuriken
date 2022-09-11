import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Col, Row, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { withAuth } from "~/components/Auth";
import AppLayout from "~/layouts/AppLayout";
import * as api from "bokkenjs";
import Ninja from "~/components/Ninja";

const { Title } = Typography;

function Ninjas() {
  const [ninjas, setNinjas] = useState<any[]>([]);

  useEffect(() => {
    api
      .getNinjas()
      .then((response: any) => setNinjas(response.data))
      .catch(() => {});
  }, []);

  return (
    <AppLayout>
      <Row justify="space-between">
        <Title level={2}>Os Meus Ninjas</Title>
        <Link href="/ninjas/new">
          <Button
            shape="circle"
            type="primary"
            size="large"
            icon={<PlusOutlined />}
          />
        </Link>
      </Row>
      <Row justify="space-around" gutter={[10, 10]}>
        {ninjas.map((ninja: any) => (
          <Col key={ninja.id}>
            <Ninja {...ninja} />
          </Col>
        ))}
      </Row>
    </AppLayout>
  );
}

export default withAuth(Ninjas);
