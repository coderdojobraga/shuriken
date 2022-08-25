import { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  notification,
  Typography,
  Upload,
} from "antd";
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "~/lib/images";
import * as USER from "~/lib/user";
import { useAuth, withAuth } from "~/components/Auth";
import AppLayout from "~/components/layouts/AppLayout";

import {
  addMentorSkills,
  addNinjaSkills,
  deleteMentorSkills,
  deleteNinjaSkills,
  getMentorSkills,
  getNinjaSkills,
  getSkills,
} from "~/lib/api";

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

  const [userSkills, setUserSkills] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const getAllSkills = () => {
    getSkills()
      .then((response) => setSkills(response.data))
      .catch((error) => notification["error"](error.data?.errors));
  };
  const getUserSkills = useCallback(() => {
    switch (user.role) {
      case USER.ROLES.MENTOR:
        getMentorSkills(user.mentor_id)
          .then((response) => {
            setUserSkills(response.data);
            setSelectedSkills(response.data.map((s) => s.id));
          })
          .catch((error) => notification["error"](error.data?.errors));
        break;
      case USER.ROLES.NINJA:
        getNinjaSkills(user.ninja_id)
          .then((response) => {
            setUserSkills(response.data);
            setSelectedSkills(response.data.map((s) => s.id));
          })
          .catch((error) => notification["error"](error.data?.errors));
        break;
    }
  }, [user]);

  const deleteSkill = (skill_id) => {
    switch (user.role) {
      case USER.ROLES.MENTOR:
        deleteMentorSkills(user.mentor_id, skill_id)
          .then((_) => getUserSkills())
          .catch((error) => notification["error"](error.data?.errors));
        break;
      case USER.ROLES.NINJA:
        deleteNinjaSkills(user.ninja_id, skill_id)
          .then((_) => getUserSkills())
          .catch((error) => notification["error"](error.data?.errors));
        break;
    }
  };

  const addSkill = (skill_id) => {
    switch (user.role) {
      case USER.ROLES.MENTOR:
        addMentorSkills(user.mentor_id, skill_id)
          .then((_) => getUserSkills())
          .catch((error) => notification["error"](error.data?.errors));
        break;
      case USER.ROLES.NINJA:
        addNinjaSkills(user.ninja_id, skill_id)
          .then((_) => getUserSkills())
          .catch((error) => notification["error"](error.data?.errors));
        break;
    }
  };

  const changeSkills = () => {
    const deleted = userSkills
      .map((s) => s.id)
      .filter((s) => !selectedSkills.includes(s));

    for (const skill of deleted) {
      deleteSkill(skill);
    }
    const added = selectedSkills.filter(
      (s) => !userSkills.map((s1) => s1.id).includes(s)
    );

    for (const skill of added) {
      addSkill(skill);
    }
  };

  useEffect(() => {
    setAvatar(user.photo);
    getUserSkills();
    getAllSkills();
  }, [user, getUserSkills]);

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
                changeSkills();
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

        {user.role == USER.ROLES.GUARDIAN || (
          <>
            <Section title="Conhecimentos" />
            <Row gutter={24}>
              <Col {...breakpoints}>
                <Select
                  mode="multiple"
                  placeholder="Adicionar conhecimento"
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
              </Col>
            </Row>
          </>
        )}
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
