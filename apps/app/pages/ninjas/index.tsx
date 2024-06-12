import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Col, Popconfirm, Row, Typography } from "antd";
import { PlusCircleFilled, PlusOutlined } from "@ant-design/icons";
import { withAuth } from "~/components/Auth";
import AppLayout from "~/layouts/AppLayout";
import * as api from "bokkenjs";
import NinjaForm from "~/components/NinjaForm";
import Ninja from "~/components/Ninja";
import { notifyError } from "~/components/Notification";
import { set } from "lodash-es";

const { Title } = Typography;

function Ninjas() {
  const [ninjas, setNinjas] = useState<any[]>([]);
  const [showNinjaForm, setShowNinjaForm] = useState(false);
  const [showPopconfirm, setShowPopconfirm] = useState(false);

  const fetchNinjas = () => {
    api
      .getNinjas()
      .then((response: any) => setNinjas(response.data))
      .catch((error) => {
        notifyError("Ocorreu um erro", "Não foi possível obter os seus ninjas");
      });
  };

  useEffect(() => {
    fetchNinjas();
  }, []);

  const handleButtonClick = () => {
    setShowNinjaForm(false);
    setShowPopconfirm(true);
  };

  const handleConfirm = () => {
    setShowNinjaForm(true);
    setShowPopconfirm(false);
  };

  const handleCancel = () => {
    setShowPopconfirm(false);
  };

  return (
    <AppLayout>
      <Row justify="space-between">
        <Title level={2}>Os Meus Ninjas</Title>
        <Popconfirm
          title="Quer criar um Ninja?"
          open={showPopconfirm}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          okText="Sim"
          cancelText="Não"
          placement="left"
        >
          <Button
            shape="default"
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleButtonClick}
          />
        </Popconfirm>
        {showNinjaForm && (
          <NinjaForm id={undefined} reloadNinjas={() => fetchNinjas()} />
        )}
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
