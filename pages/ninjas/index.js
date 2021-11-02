import { useEffect, useState } from "react";
import { Avatar, Button, Card, Form, Row, Typography, Modal } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  PlusOutlined,
  SaveOutlined
} from "@ant-design/icons";
import { withAuth } from "~/components/Auth";
import AppLayout from "~/components/layouts/AppLayout";
import LinkTo from "~/components/utils/LinkTo";
import New from "./new"
import * as api from "~/lib/api";


const { Meta } = Card;
const { Title } = Typography;

function Ninjas() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [ninjas, setNinjas] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    api
      .getNinjas()
      .then((response) => setNinjas(response.data))
      .catch(() => { });
  }, []);

  const showPopup = () => {
    setPopupVisible(true);
  };


  const handleClose = () => {
    setPopupVisible(false);
  };


  return (
    <AppLayout>
      <Row justify="space-between">
        <Title level={2}>Os Meus Ninjas</Title>
        <Button
          shape="circle"
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={showPopup}
        />
        <Modal
          visible={isPopupVisible}
          title="Novo Ninja"
          footer={null}
          onCancel={handleClose}
        >
          <New form={form} close={handleClose}/>
        </Modal>
      </Row>
      <Row justify="space-around" gutter={[10, 10]}>
        {ninjas.map((ninja) => (
          <Card
            key={ninja.id}
            size="large"
            style={{ width: 300, marginTop: 16 }}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <LinkTo href={`/profile/ninja/${ninja.id}`}>
              <Meta
                avatar={<Avatar src={ninja.photo} />}
                title={`${ninja.first_name} ${ninja.last_name}`}
              />
            </LinkTo>
          </Card>
        ))}
      </Row>
    </AppLayout>
  );
}

export default withAuth(Ninjas);
