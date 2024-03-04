import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { useRouter } from "next/router";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
  notification,
} from "antd";
import moment from "moment";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import * as api from "bokkenjs";
import { notifyError, notifyInfo } from "~/components/Notification";
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
      .catch((error) => {
        notifyError(
          "Ocorreu um erro",
          "Não foi possível obter as linguages disponíveis",
        );
      });
  };
  const getUserSkills = useCallback(() => {
    if (id) {
      api
        .getNinjaSkills(id)
        .then((response) => {
          setUserSkills(response.data);
          setSelectedSkills(response.data.map((s) => s.id));
        })
        .catch((error) => {
          notifyError(
            "Ocorreu um erro",
            "Não foi possível obter as linguages que o ninja quer aprender",
          );
        });
    }
  }, [id]);

  const deleteSkill = (ninja_id, skill_id) => {
    api.deleteNinjaSkills(ninja_id, skill_id).then((_) => getUserSkills());
  };

  const addSkill = (ninja_id, skill_id) => {
    api.addNinjaSkills(ninja_id, skill_id).then((_) => getUserSkills());
  };

  const changeSkills = (ninja_id) => {
    const deleted = userSkills
      .map((s) => s.id)
      .filter((s) => !selectedSkills.includes(s));

    for (const skill of deleted) {
      deleteSkill(ninja_id, skill);
    }
    const added = selectedSkills.filter(
      (s) => !userSkills.map((s1) => s1.id).includes(s),
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
      api.getNinja(id).then((response) => setNinja(response.data));
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
          notifyInfo("O ninja foi editado com sucesso");
          router.push("/ninjas");
        })
        .catch((error) => {
          notifyError(
            "Ocorreu um erro",
            "Não foi possível atualizar os dados do ninja",
          );
        });
    } else {
      api
        .createNinja(values)
        .then((response) => {
          changeSkills(response.data.id);
          router.push("/ninjas");
        })
        .catch((error) => {
          notifyError("Ocorreu um erro", "Não foi possível criar o ninja");
        });
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
          <Link href="/ninjas">
            <Button
              danger
              shape="circle"
              size="large"
              icon={<CloseOutlined />}
            />
          </Link>
          <Button
            shape="circle"
            type="primary"
            size="large"
            icon={<SaveOutlined />}
            onClick={() => form.submit()}
          />
        </Space>
      </Row>
      <Row align="middle">
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
            <Row justify="center">
              <Link href="/blog/posts/choosing-first-language">
                <Button type="secondary">
                  Como escolher a linguagem para o ninja aprender?
                </Button>
              </Link>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
}
