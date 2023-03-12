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
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { getBase64 } from "~/lib/images";
import { useAuth } from "@coderdojobraga/ui";
import { notifyError, notifyInfo } from "~/components/Notification";
import { getIcon } from "~/lib/utils";
import {
  EUser,
  addMentorSkills,
  addNinjaSkills,
  deleteMentorSkills,
  deleteNinjaSkills,
  getMentor,
  getMentorSkills,
  getNinjaSkills,
  getSkills,
} from "bokkenjs";
import { withAuth } from "~/components/Auth";
import AppLayout from "~/layouts/AppLayout";
import {
  SiCodewars,
  SiDiscord,
  SiGithub,
  SiGitlab,
  SiPython,
  SiScratch,
  SiSlack,
  SiTrello,
} from "react-icons/si";

const { Title } = Typography;
const { Option } = Select;

const Section = ({ title }: { title: string }) => (
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
  const [avatar, setAvatar] = useState<undefined | string>();

  const [userSkills, setUserSkills] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<any[]>([]);
  const [mentorSocials, setMentorSocials] = useState([]);
  const [socials] = useState([
    "Scratch",
    "Codewars",
    "GitHub",
    "GitLab",
    "Trello",
    "Discord",
    "Slack",
  ]);

  const getAllSkills = () => {
    getSkills()
      .then((response) => setSkills(response.data))
      .catch((error) => {
        notifyError(
          "Ocorreu um erro",
          "Não foi possível obter os conhecimentos"
        );
      });
  };

  const getUserSkills = useCallback(() => {
    switch (user?.role) {
      case EUser.Mentor:
        getMentorSkills(user?.mentor_id!)
          .then((response) => {
            setUserSkills(response.data);
            setSelectedSkills(response.data.map((skill: any) => skill.id));
          })
          .catch((error) => {
            notifyError(
              "Ocorreu um erro",
              "Não foi possível obter os conhecimentos"
            );
          });
        break;

      case EUser.Ninja:
        getNinjaSkills(user?.ninja_id!)
          .then((response) => {
            setUserSkills(response.data);
            setSelectedSkills(response.data.map((skill: any) => skill.id));
          })
          .catch((error) => {
            notifyError(
              "Ocorreu um erro",
              "Não foi possível obter as linguagens do ninja"
            );
          });
        break;
    }
  }, [user]);

  const deleteSkill = (skill_id: string) => {
    switch (user?.role) {
      case EUser.Mentor:
        deleteMentorSkills(user?.mentor_id!, skill_id)
          .then((_) => getUserSkills())
          .catch((error) => {
            notifyError(
              "Ocorreu um erro",
              "Não foi possível alterar os conhecimentos"
            );
          });
        break;

      case EUser.Ninja:
        deleteNinjaSkills(user?.ninja_id!, skill_id)
          .then((_) => getUserSkills())
          .catch((error) => {
            notifyError(
              "Ocorreu um erro",
              "Não foi possível alterar as linguagens"
            );
          });
        break;
    }
  };

  const addSkill = (skill_id: string) => {
    switch (user?.role) {
      case EUser.Mentor:
        addMentorSkills(user?.mentor_id!, skill_id)
          .then((_) => getUserSkills())
          .catch((error) => {
            notifyError(
              "Ocorreu um erro",
              "Não foi possível alterar os conhecimentos"
            );
          });
        break;

      case EUser.Ninja:
        addNinjaSkills(user?.ninja_id!, skill_id)
          .then((_) => getUserSkills())
          .catch((error) => {
            notifyError(
              "Ocorreu um erro",
              "Não foi possível alterar as linguagens"
            );
          });
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

  const editUser = () => {
    edit_user
      .then(() => {
        notifyInfo("Atualizado com sucesso!");
      })
      .catch((error) => [
        notifyError("Não foi possível atualizar.")
      ]);
  };

  useEffect(() => {
    if (user?.role === EUser.Mentor) {
      getMentor(user?.mentor_id!)
        .then((response) => {
          setMentorSocials(response.data?.socials);
          formPersonal.setFieldsValue({
            "user[socials]": response.data?.socials,
          });
        })
        .catch((error) => notification["error"](error.data?.errors));
    }
  }, [user?.role, user?.mentor_id, formPersonal]);

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
      <Form form={formPersonal} onFinish={editUser} layout="vertical">
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

        {user?.role === EUser.Mentor && (
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
            <Section title="Redes Sociais" />
            <Form.Item name="user[socials]" initialValue={mentorSocials}>
              <Form.List name="user[socials]">
                {(fields, { add, remove }) => (
                  <Space direction="vertical" style={{ width: "100%" }}>
                    {fields.map((field) => (
                      <Space key={field.key} align="baseline">
                        <Form.Item {...field} name={[field.name, "name"]}>
                          <Select
                            placeholder="Rede Social"
                            style={{ width: 130 }}
                          >
                            {socials?.map((item: string) => (
                              <Option
                                key={item}
                                value={item.toLocaleLowerCase()}
                              >
                                {getIcon(item)} {item}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item {...field} name={[field.name, "username"]}>
                          <Input placeholder="Username" />
                        </Form.Item>
                        <MinusCircleOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      </Space>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Adicionar Rede Social
                      </Button>
                    </Form.Item>
                  </Space>
                )}
              </Form.List>
            </Form.Item>
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
