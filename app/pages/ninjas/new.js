import { useRouter } from "next/router";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { withAuth } from "@components/Auth";
import AppLayout from "@components/layouts/AppLayout";
import LinkTo from "@components/utils/LinkTo";
import * as api from "@lib/api";

const { Title } = Typography;

function Ninjas() {
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    api
      .createNinja(values)
      .then(() => router.push("/ninjas"))
      .catch();
  };

  return (
    <AppLayout>
      <Row justify="space-between">
        <Title level={2}>Novo Ninja</Title>
        <Space>
          <LinkTo href="/ninjas">
            <Button
              danger
              shape="circle"
              size="large"
              icon={<CloseOutlined />}
            />
          </LinkTo>
          <Button
            shape="circle"
            type="primary"
            size="large"
            icon={<SaveOutlined />}
            onClick={() => form.submit()}
          />
        </Space>
      </Row>
      <Row justify="center" align="middle">
        <Col xs={24} sm={24} md={20} lg={16} xl={12}>
          <Form
            {...{
              labelCol: { span: 8 },
              wrapperCol: { span: 16 },
            }}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              label="Nome"
              name="ninja[first_name]"
              rules={[{ required: true }]}
            >
              <Input placeholder="Linus" />
            </Form.Item>
            <Form.Item
              label="Apelido"
              name="ninja[last_name]"
              rules={[{ required: true }]}
            >
              <Input placeholder="Torvalds" />
            </Form.Item>
            <Form.Item
              label="Aniversário"
              name="ninja[birthday]"
              rules={[{ required: true }]}
            >
              <DatePicker />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </AppLayout>
  );
}

export default withAuth(Ninjas);
