import { useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, Button, Card, notification, Row, Typography } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { withAuth } from "~/components/Auth";
import AppLayout from "~/components/layouts/AppLayout";
import LinkTo from "~/components/utils/LinkTo";
import * as api from "~/lib/api";
import Belt from "~/components/Belt";
import { notifyError } from "~/components/ErrorNotification";

const { Meta } = Card;
const { Title } = Typography;

function Ninjas() {
  const [ninjas, setNinjas] = useState([]);

  useEffect(() => {
    api
      .getNinjas()
      .then((response) => setNinjas(response.data))
      .catch(notifyError);
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
          <Card
            key={ninja.id}
            size="large"
            style={{ width: 300, marginTop: 16 }}
            actions={[
              <Link key={`link ${ninja.id}`} href={`/ninjas/edit/${ninja.id}`}>
                <a>
                  <EditOutlined key="edit" />
                </a>
              </Link>,
            ]}
          >
            <LinkTo href={`/profile/ninja/${ninja.id}`}>
              <Meta
                avatar={<Avatar src={ninja.photo} />}
                title={`${ninja.first_name} ${ninja.last_name}`}
              />
              <Belt belt={ninja.belt} />
            </LinkTo>
          </Card>
        ))}
      </Row>
    </AppLayout>
  );
}

export default withAuth(Ninjas);
