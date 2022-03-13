/* eslint-disable jsx-a11y/accessible-emoji */ // FIxed in emoji component
import { useRouter } from "next/router";
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
  Upload,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuth } from "@components/Auth";
import * as api from "@lib/api";
import * as USER from "@lib/user";
import { getBase64 } from "@lib/images";
import Emoji from "@components/Emoji";

import styles from "./style.module.css";
import { useState } from "react";

const { Option } = Select;

const CountrySelect = () => (
  <Select defaultValue="+351">
    <Option value="+351">
      <Emoji label="Bandeira Portuguesa">🇵🇹</Emoji>
    </Option>
  </Select>
);

function Register({ cities }) {
  const router = useRouter();
  const { Title } = Typography;
  const { user } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const [avatar, setAvatar] = useState(null);
  const [socials] = useState(["Codewars", "GitHub", "GitLab", "Scratch"]);

  const onFinish = (values) => {
    setLoading(true);
    api
      .registerUser(values)
      .then(() => {
        router.push("/dashboard");
      })
      .catch((error) => setErrors(error?.data?.errors))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Row
        justify="center"
        align="middle"
        gutter={12}
        className={styles.header}
      >
        <Col>
          <Emoji label="Party Popper Emoji" className={styles.emoji}>
            🎉
          </Emoji>
        </Col>
        <Col>
          <Title style={{ margin: 0 }}>Já está quase!</Title>
          <Title level={3} style={{ margin: 0 }}>
            Basta preencheres o formulário abaixo para terminares o registo
          </Title>
        </Col>
      </Row>

      <Row justify="center">
        <Avatar src={avatar} size={70} icon={<UserOutlined />} />
      </Row>

      <Row justify="center">
        <Col xs={24} md={20} xl={15} xxl={10}>
          <Form
            name="signup"
            onFinish={onFinish}
            layout="vertical"
            className={styles.form}
          >
            <Form.Item
              name="user[first_name]"
              label="Nome"
              rules={[
                {
                  type: "string",
                  required: true,
                },
              ]}
            >
              <Input placeholder="Nome" type="text" />
            </Form.Item>

            <Form.Item
              name="user[last_name]"
              label="Apelido"
              rules={[
                {
                  type: "string",
                  required: true,
                },
              ]}
            >
              <Input placeholder="Apelido" type="text" />
            </Form.Item>
            <Form.Item
              name="user[mobile]"
              label="Telemóvel"
              rules={[
                {
                  required: true,
                  pattern: /^[0-9]{9}$/,
                  message: "Não é um número de telemóvel válido",
                },
              ]}
            >
              <Input
                addonBefore={<CountrySelect />}
                placeholder="9x0011222"
                type="tel"
              />
            </Form.Item>

            {user.role == USER.ROLES.MENTOR && (
              <Form.Item
                name="user[birthday]"
                label="Data de nascimento"
                rules={[
                  {
                    type: "date",
                    required: false,
                  },
                ]}
              >
                <DatePicker
                  allowClear
                  placeholder="Selecionar data"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            )}

            {user.role == USER.ROLES.MENTOR && (
              <Form.Item
                name="user[major]"
                label="Curso"
                rules={[
                  {
                    type: "string",
                    required: false,
                  },
                ]}
              >
                <Input placeholder="Engenharia Informática" type="text" />
              </Form.Item>
            )}

            <Form.Item
              name="user[photo]"
              label="Foto de perfil"
              valuePropName="avatar"
            >
              <Upload
                name="avatar"
                accept="image/*"
                beforeUpload={(file) => {
                  getBase64(file, (imageUrl) => setAvatar(imageUrl));
                  return false;
                }}
                onRemove={() => setAvatar(null)}
                multiple={false}
                maxCount={1}
                showUploadList={{
                  showDownloadIcon: false,
                  showPreviewIcon: false,
                  showRemoveIcon: true,
                }}
              >
                <Button icon={<UploadOutlined />}>Selecionar</Button>
              </Upload>
            </Form.Item>
            {user.role == USER.ROLES.MENTOR && (
              <Form.Item name="user[socials]" label="Redes Sociais">
                <Form.List name="user[socials]" label="Redes Sociais">
                  {(fields, { add, remove }) => (
                    <Space direction="vertical" style={{ width: "100%" }}>
                      {fields.map((field) => (
                        <Space key={field.key} align="baseline">
                          <Form.Item {...field} name={[field.name, "name"]}>
                            <Select
                              placeholder="Rede Social"
                              style={{ width: 130 }}
                            >
                              {socials.map((item) => (
                                <Option
                                  key={item}
                                  value={item.toLocaleLowerCase()}
                                >
                                  {item}
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
            )}

            {user.role == USER.ROLES.GUARDIAN && (
              <Form.Item
                name="user[city]"
                label="Cidade"
                rules={[
                  {
                    type: "string",
                    required: false,
                  },
                ]}
              >
                <Select
                  allowClear
                  showSearch
                  placeholder="Selecionar cidade"
                  defaultValue="Braga"
                  style={{ maxWidth: "300px" }}
                >
                  {cities &&
                    cities.map((city) => (
                      <Select.Option key={city} value={city} showSearch={true}>
                        {city}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            )}

            <Form.Item
              validateStatus={errors && "error"}
              help={errors?.email && "Email já registado"}
            >
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                style={{ width: "100%" }}
              >
                Concluir registo
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Register;
