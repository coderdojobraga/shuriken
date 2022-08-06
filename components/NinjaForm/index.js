import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  notification,
  Row,
  Space,
  Typography,
} from "antd";
import moment from "moment";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import LinkTo from "~/components/utils/LinkTo";
import * as api from "~/lib/api";

const { Title } = Typography;

export default function NinjaForm({ id }) {
  const router = useRouter();
  const [form] = Form.useForm();

  const [ninja, setNinja] = useState(undefined);

  useEffect(() => {
    if (id) {
      api
        .getNinja(id)
        .then((response) => setNinja(response.data))
        .catch((error) => notification["error"](error.data?.errors));
    }
  }, [id]);

  useEffect(() => {
    form.resetFields();
  }, [ninja, form]);

  const onFinish = (values) => {
    if (id) {
      api
        .updateNinja(id, values)
        .then(() => router.push("/ninjas"))
        .catch();
    } else {
      api
        .createNinja(values)
        .then(() => router.push("/ninjas"))
        .catch();
    }
  };

  return (
    <>
      <Row justify="space-between">
        <Title level={2}>
          {id && ninja
            ? ninja.first_name + " " + ninja.last_name
            : "Novo Ninja"}
        </Title>
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
            initialValues={ninja}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              label="Nome"
              name="ninja[first_name]"
              rules={[{ required: true }]}
              initialValue={ninja ? ninja.first_name : null}
            >
              <Input placeholder="Linus" />
            </Form.Item>
            <Form.Item
              label="Apelido"
              name="ninja[last_name]"
              rules={[{ required: true }]}
              initialValue={id && ninja ? ninja.last_name : ""}
            >
              <Input placeholder="Torvalds" />
            </Form.Item>
            <Form.Item
              label="Aniversário"
              name="ninja[birthday]"
              rules={[{ required: true }]}
              initialValue={
                id && ninja ? moment(ninja.birthday, "YYYY-MM-DD") : null
              }
            >
              <DatePicker />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
