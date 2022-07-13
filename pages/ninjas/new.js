import { useRouter } from "next/router";
import { Button, DatePicker, Form, Input, Row } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { withAuth } from "~/components/Auth";
import * as api from "~/lib/api";

function New({ form, close }) {
  const router = useRouter();

  const onFinish = (values) => {
    api
      .createNinja(values)
      .then(() => router.push("/ninjas"))
      .catch();
  };

  const handleSave = () => {
    form.submit();
    close();
  };

  return (
    <>
      <Row justify="left" align="left">
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
      </Row>
      <Button
        type="primary"
        size="large"
        block
        icon={<SaveOutlined />}
        onClick={handleSave}
      >
        Guardar
      </Button>
    </>
  );
}

export default withAuth(New);
