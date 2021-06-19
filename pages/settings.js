import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Typography,
  Upload,
} from "antd";
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";
import { useAuth, withAuth } from "~/components/Auth";
import AppLayout from "~/components/layouts/AppLayout";
import { getBase64 } from "~/lib/utils/images";

const { Title } = Typography;

const Section = ({ title }) => (
  <Divider orientation="left">
    <Title level={5} type="secondary">
      {title}
    </Title>
  </Divider>
);

function Settings() {
  const { user, edit_user, isLoading } = useAuth();
  const [formPersonal] = Form.useForm();
  const [formPassword] = Form.useForm();
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    setAvatar(user.photo);
  }, [user]);

  const breakpoints = {
    xs: 24,
    md: 12,
    xl: 8,
    xxl: 6,
  };

  return (
    <AppLayout>
      <Row justify="space-between">
        <Col>
          <Title level={2}>Configurações</Title>
        </Col>
        <Col>
          <Space>
            <Button
              onClick={() => {
                formPersonal.resetFields();
                setAvatar(user.photo);
              }}
            >
              Cancelar
            </Button>
            <Button
              loading={isLoading}
              onClick={() => {
                formPersonal.submit();
              }}
              type="primary"
            >
              Guardar
            </Button>
          </Space>
        </Col>
      </Row>
      <Form form={formPersonal} onFinish={edit_user} layout="vertical">
        <Section title="Foto de Perfil" />
        <Space>
          <Avatar size={100} src={avatar} />
          <Form.Item name="user[photo]">
            <Upload
              accept="image/*"
              maxCount={1}
              beforeUpload={(file) => {
                getBase64(file, (imageUrl) => setAvatar(imageUrl));
                return false;
              }}
              onRemove={() => setAvatar(user.photo)}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Space>
        <Section title="Informações Pessoais" />
        <Row gutter={24}>
          <Col {...breakpoints}>
            <Form.Item name="user[first_name]" label="Nome">
              <Input defaultValue={user.first_name} />
            </Form.Item>
          </Col>
          <Col {...breakpoints}>
            <Form.Item name="user[last_name]" label="Apelido">
              <Input defaultValue={user.last_name} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col {...breakpoints}>
            <Form.Item name="user[email]" label="Email">
              <Input defaultValue={user.email} />
            </Form.Item>
          </Col>

          <Col {...breakpoints}>
            <Form.Item name="user[birthday]" label="Data de Nascimento">
              <DatePicker
                showToday={false}
                defaultValue={
                  user?.birthday && moment(user.birthday, "YYYY-MM-DD")
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Section title="Segurança" />
      <Form form={formPassword} layout="vertical">
        <Row gutter={24}>
          <Col {...breakpoints}>
            <Form.Item name="password" label="Palavra-passe">
              <Input.Password placeholder="Nova palavra-passe" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </AppLayout>
  );
}

export default withAuth(Settings);
