/* eslint-disable jsx-a11y/accessible-emoji */ // FIxed in emoji component
import { useRouter } from "next/router";
import {
  Typography,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Upload,
  Space,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAuth } from "~/components/Auth";
import * as api from "~/lib/utils/api.js";
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

function Register() {
  const router = useRouter();
  const { Title } = Typography;
  const { user, errors, isLoading } = useAuth();

  const onFinish = (e) => {
    api
      .registerMentor({
        user_id: user.id,
        first_name: e.first_name,
        last_name: e.last_name,
        mobile: e.mobile,
        photo: e.photo?.file,
        // birtday,
        major: e.major,
      })
      .then(() => router.push("/dashboard"));
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

      {/* <Row justify="center">
        <Avatar
          size={70}
          icon={<UserOutlined />}
        />
      </Row> */}

      <Row justify="center">
        <Col xs={24} md={20} xl={15} xxl={10}>
          <Form
            name="signup"
            onFinish={onFinish}
            layout="vertical"
            className={styles.form}
          >
            <Form.Item
              name="first_name"
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
              name="last_name"
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
              name="mobile"
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
              name="major"
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
              name="photo"
              label="Foto de perfil"
              valuePropName="avatar"
              // getValueFromEvent={normFile}
            >
              <Upload
                name="avatar"
                accept="image/png, image/jpeg"
                beforeUpload={() => {
                  // Prevent upload
                  return false;
                }}
                listType="picture"
                multiple={false}
                maxCount={1}
                showUploadList={{
                  showDownloadIcon: false,
                  showPreviewIcon: false,
                  showRemoveIcon: true,
                }}
              >
                {/* <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg"
              /> */}
                <Button icon={<UploadOutlined />}>Selecionar</Button>
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
