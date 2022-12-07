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
  Typography,
  Upload,
  notification,
} from "antd";
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "~/lib/images";
import { useAuth } from "@coderdojobraga/ui";
import {
  EUser,
  addMentorSkills,
  addNinjaSkills,
  deleteMentorSkills,
  deleteNinjaSkills,
  getMentorSkills,
  getNinjaSkills,
  getSkills,
} from "bokkenjs";
import { withAuth } from "~/components/Auth";
import AppLayout from "~/layouts/AppLayout";
import { SiPython } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { SiCss3 } from "react-icons/si";
import { SiHtml5 } from "react-icons/si";
import { SiCsharp } from "react-icons/si";
import { SiScratch } from "react-icons/si";
import { SiElixir } from "react-icons/si";

const { Title } = Typography;

const Section = ({ title }: { title: string }) => (
  <Divider orientation="left">
    <Title level={5} type="secondary">
      {title}
    </Title>
  </Divider>
);

function getIcon(skill: string) {
  switch (skill) {
    case "Python":
      return <SiPython />;
    case "HTML/CSS/Javascript":
      return (
        <i>
          {" "}
          <SiHtml5 /> <SiCss3 /> <SiJavascript />{" "}
        </i>
      );
    case "C#":
      return <SiCsharp />;
    case "Scratch":
      return <SiScratch />;
    case "Elixir":
      return <SiElixir />;
  }
}

function Settings() {
  const { user, edit_user, isLoading } = useAuth();
  const [formPersonal] = Form.useForm();
  const [formPassword] = Form.useForm();
  const [avatar, setAvatar] = useState<undefined | string>();

  const [userSkills, setUserSkills] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<any[]>([]);

  const getAllSkills = () => {
    getSkills()
      .then((response) => setSkills(response.data))
      .catch((error) => notification["error"](error.data?.errors));
  };
  const getUserSkills = useCallback(() => {
    switch (user?.role) {
      case EUser.Mentor:
        getMentorSkills(user?.mentor_id!)
          .then((response) => {
            setUserSkills(response.data);
            setSelectedSkills(response.data.map((skill: any) => skill.id));
          })
          .catch((error) => notification["error"](error.data?.errors));
        break;
      case EUser.Ninja:
        getNinjaSkills(user?.ninja_id!)
          .then((response) => {
            setUserSkills(response.data);
            setSelectedSkills(response.data.map((skill: any) => skill.id));
          })
          .catch((error) => notification["error"](error.data?.errors));
        break;
    }
  }, [user]);

  const deleteSkill = (skill_id: string) => {
    switch (user?.role) {
      case EUser.Mentor:
        deleteMentorSkills(user?.mentor_id!, skill_id)
          .then((_) => getUserSkills())
          .catch((error) => notification["error"](error.data?.errors));
        break;
      case EUser.Ninja:
        deleteNinjaSkills(user?.ninja_id!, skill_id)
          .then((_) => getUserSkills())
          .catch((error) => notification["error"](error.data?.errors));
        break;
    }
  };

  const addSkill = (skill_id: string) => {
    switch (user?.role) {
      case EUser.Mentor:
        addMentorSkills(user?.mentor_id!, skill_id)
          .then((_) => getUserSkills())
          .catch((error) => notification["error"](error.data?.errors));
        break;
      case EUser.Ninja:
        addNinjaSkills(user?.ninja_id!, skill_id)
          .then((_) => getUserSkills())
          .catch((error) => notification["error"](error.data?.errors));
        break;
    }
  };

  const changeSkills = () => {
    const deleted = userSkills
      .map((skill: any) => skill.id)
      .filter((skill: any) => !selectedSkills.includes(skill));

    for (const skill of deleted) {
      deleteSkill(skill);
    }
    const added = selectedSkills.filter(
      (skill) => !userSkills.map((s1: any) => s1.id).includes(skill)
    );

    for (const skill of added) {
      addSkill(skill);
    }
  };

  useEffect(() => {
    setAvatar(user?.photo);
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
                setAvatar(user?.photo);
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
                getBase64(file, (imageUrl: any) => setAvatar(imageUrl));
                return false;
              }}
              onRemove={() => setAvatar(user?.photo)}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Space>
        <Section title="Informações Pessoais" />
        <Row gutter={24}>
          <Col {...breakpoints}>
            <Form.Item name="user[first_name]" label="Nome">
              <Input defaultValue={user?.first_name} />
            </Form.Item>
          </Col>
          <Col {...breakpoints}>
            <Form.Item name="user[last_name]" label="Apelido">
              <Input defaultValue={user?.last_name} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col {...breakpoints}>
            <Form.Item name="user[email]" label="Email">
              <Input defaultValue={user?.email} />
            </Form.Item>
          </Col>

          <Col {...breakpoints}>
            <Form.Item name="user[birthday]" label="Data de Nascimento">
              <DatePicker
                showToday={false}
                defaultValue={
                  (user?.birthday && moment(user.birthday, "YYYY-MM-DD")) ||
                  moment()
                }
              />
            </Form.Item>
          </Col>
        </Row>

        {user?.role == EUser.Guardian || (
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
                  {skills.map((skill: any) => (
                    <Select.Option key={skill.id} value={skill.id}>
                      <div style={{ marginTop: "3px" }}>
                        {getIcon(skill.name)} {skill.name}
                      </div>
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
