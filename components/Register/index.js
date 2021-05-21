/* eslint-disable jsx-a11y/accessible-emoji */ // FIxed in emoji component
import {
  Typography,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Upload,
  Space,
  Avatar,
  Row,
  Col,
} from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth } from "~/components/Auth";
import Emoji from "../Emoji";

import styles from "./style.module.css";

const { Option } = Select;

const CountrySelect = () => (
  <Select defaultValue="+351">
    <Option value="+351">
      <Emoji label="Bandeira Portuguesa">🇵🇹</Emoji>
    </Option>
  </Select>
);

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

function Register() {
  const { Title } = Typography;
  const { errors, isLoading } = useAuth();

  const onFinish = (e) => {
    console.log(e);
  };

  return (
    <>
      <Row justify="center" align="middle" gutter={12}>
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
        {/* </div> */}
      </Row>

      <Row justify="center">
        <Avatar size={70} icon={<UserOutlined />} className={styles.avatar} />
      </Row>

      <Row justify="center">
        <Col xs={24} md={20} xl={15} xxl={10}>
          <Form name="signup" onFinish={onFinish} layout="vertical">
            <Form.Item
              name="name"
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
              name="surname"
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
              name="phone"
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

            <Form.Item
              name="birthday"
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

            <Form.Item
              name="course"
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

            <Form.Item
              name="avatar"
              label="Foto de perfil"
              valuePropName="avatar"
              getValueFromEvent={normFile}
            >
              <Upload
                name="avatar"
                listType="picture"
                multiple={false}
                showUploadList={{
                  showDownloadIcon: false,
                  showPreviewIcon: false,
                  showRemoveIcon: true,
                }}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item name="socialmedia" label="Redes Sociais" rules={[{}]}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Input
                  addonBefore="GitHub"
                  placeholder="coderdojo"
                  type="text"
                />
                <Input
                  addonBefore="GitLab"
                  placeholder="coderdojo"
                  type="text"
                />
                <Input
                  addonBefore="Scratch"
                  placeholder="coderdojo"
                  type="text"
                />
                <Input
                  addonBefore="Codewars"
                  placeholder="coderdojo"
                  type="text"
                />
              </Space>
            </Form.Item>

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
