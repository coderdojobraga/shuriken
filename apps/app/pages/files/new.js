import { useRouter } from "next/router";
import { Button, Col, Form, Input, Row, Space, Typography, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { withAuth } from "~/components/Auth";
import AppLayout from "~/layouts/AppLayout";
import * as api from "bokkenjs";

const { Title } = Typography;
const { Dragger } = Upload;

function NewFile() {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = (values) => {
    api
      .createFile(values)
      .then(() => router.push("/files"))
      .catch();
  };

  return (
    <AppLayout>
      <Row justify="space-between">
        <Col>
          <Title level={2}>Novo Ficheiro</Title>
        </Col>
        <Col>
          <Space>
            <Button onClick={() => router.push("/files")}>Cancelar</Button>
            <Button onClick={() => form.submit()} type="primary">
              Guardar
            </Button>
          </Space>
        </Col>
      </Row>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        wrapperCol={{
          xs: { span: 24 },
          lg: { span: 22 },
        }}
      >
        <Row justify="center" align="middle">
          <Col xs={24} lg={12}>
            <Col>
              <Form.Item name="file[title]" label="Título">
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="file[description]" label="Descrição">
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item name="file[document]" noStyle>
              <Dragger
                beforeUpload={() => {
                  return false;
                }}
                multiple={false}
                maxCount={1}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Clique ou arraste o ficheiro para esta área
                </p>
              </Dragger>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </AppLayout>
  );
}

export default withAuth(NewFile);
