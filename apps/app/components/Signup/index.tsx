import { useState } from "react";
import Link from "next/link";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Space,
  Tooltip,
  Typography,
} from "antd";
import {
  InfoCircleOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useAuth } from "@coderdojobraga/ui";

import styles from "./style.module.css";

function Signup() {
  const { Title, Text } = Typography;
  const { errors, isLoading, sign_up } = useAuth();
  const [size, setSize] = useState("");

  const handleSizeChange = (e: any) => {
    setSize(e.target.value);
  };

  const onFinish = ({ email, password, role }: any) => {
    sign_up({ email, password, role });
  };

  return (
    <Form name="signup" onFinish={onFinish}>
      <Title>Registar</Title>

      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            required: true,
          },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" type="email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
          },
          { min: 8, message: "Password tem de ter no mínimo 8 caracteres." },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          type="password"
          placeholder="Palavra-passe"
        />
      </Form.Item>

      <Form.Item
        name="role"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Radio.Group value={size} onChange={handleSizeChange}>
          <Space direction="vertical">
            <Radio value="guardian" className="mb-2">
              Guardião
              <label id="mentor-description" className="ml-2 text-gray-500">
                Tutor legal da criança.
              </label>
            </Radio>

            <Radio value="mentor" className="mb-2">
              Mentor
              <label id="mentor-description" className="ml-6 text-gray-500">
                Voluntário na organização.
              </label>
            </Radio>
            <Tooltip
              className={styles.option}
              title="Inicia sessão como Guardião para inscreveres um Ninja"
            >
              <Radio disabled value="1">
                Ninja
                <label id="mentor-description" className="ml-8 text-gray-500">
                  Criança participante. &nbsp;
                </label>
                <InfoCircleOutlined />
              </Radio>
            </Tooltip>
          </Space>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="terms"
        valuePropName="checked"
        rules={[
          {
            type: "boolean",
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    "É necessário concordar com os termos e condições"
                  ),
          },
        ]}
      >
        <Checkbox>
          <Text>
            Eu li e aceito a{" "}
            <Link href="/docs/terms-of-service.pdf" target="_blank">
              política de privacidade e os termos de uso
            </Link>
          </Text>
        </Checkbox>
      </Form.Item>

      <Form.Item
        className={styles.button}
        validateStatus={errors && "error"}
        help={errors || "Email já registado"}
      >
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          className={styles.submit}
        >
          Registar
        </Button>
      </Form.Item>

      <Text>
        Já tens uma conta?{" "}
        <Link href="/dashboard/login">Inicia sessão aqui</Link>
      </Text>
    </Form>
  );
}

export default Signup;
