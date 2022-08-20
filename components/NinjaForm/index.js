import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/router";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  notification,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import moment from "moment";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import LinkTo from "~/components/utils/LinkTo";
import * as api from "~/lib/api";
import { notifyError } from "~/components/ErrorNotification";

const { Title } = Typography;

export default function NinjaForm({ id }) {
  const router = useRouter();
  const [form] = Form.useForm();

  const [ninja, setNinja] = useState(undefined);

  const [userSkills, setUserSkills] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const getAllSkills = () => {
    api
      .getSkills()
      .then((response) => setSkills(response.data))
      .catch(notifyError);
  };
  const getUserSkills = useCallback(() => {
    if (id) {
      api
        .getNinjaSkills(id)
        .then((response) => {
          setUserSkills(response.data);
          setSelectedSkills(response.data.map((s) => s.id));
        })
        .catch(notifyError);
    }
  }, [id]);

  const deleteSkill = (ninja_id, skill_id) => {
    api
      .deleteNinjaSkills(ninja_id, skill_id)
      .then((_) => getUserSkills())
      .catch(notifyError);
  };

  const addSkill = (ninja_id, skill_id) => {
    api
      .addNinjaSkills(id, skill_id)
      .then((_) => getUserSkills())
      .catch(notifyError);
  };

  const changeSkills = (ninja_id) => {
    const deleted = userSkills
      .map((s) => s.id)
      .filter((s) => !selectedSkills.includes(s));

    for (const skill of deleted) {
      deleteSkill(ninja_id, skill);
    }
    const added = selectedSkills.filter(
      (s) => !userSkills.map((s1) => s1.id).includes(s)
    );

    for (const skill of added) {
      addSkill(ninja_id, skill);
    }
  };

  useEffect(() => {
    getUserSkills();
    getAllSkills();
  }, [getUserSkills]);

  useEffect(() => {
    if (id) {
      api
        .getNinja(id)
        .then((response) => setNinja(response.data))
        .catch(notifyError);
    }
  }, [id]);

  useEffect(() => {
    form.resetFields();
  }, [ninja, form]);

  const onFinish = (values) => {
    if (id) {
      api
        .updateNinja(id, values)
        .then(() => {
          changeSkills(id);
          router.push("/ninjas");
        })
        .catch(notifyError);
    } else {
      api
        .createNinja(values)
        .then((response) => {
          changeSkills(response.data.id);
          router.push("/ninjas");
        })
        .catch(notifyError);
    }
  };

  const breakpoints = {
    xs: 24,
    md: 12,
    xl: 8,
    xxl: 6,
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

            <Form.Item label="Quer aprender">
              <Select
                mode="multiple"
                placeholder="Adicionar linguagem"
                onChange={setSelectedSkills}
                value={selectedSkills}
                style={{ minWidth: "200px" }}
              >
                {skills.map((s) => (
                  <Select.Option key={s.id} value={s.id}>
                    {s.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
