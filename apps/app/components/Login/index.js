import Link from "next/link";
import { Button, Form, Input, Typography, notification } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useAuth } from "@coderdojobraga/ui";
import Koi from "~/components/Koi";

import styles from "./style.module.css";

function Login() {
  const { Title, Text } = Typography;
  const { errors, isLoading, login } = useAuth();

  const onFinish = ({ email, password }) => {
    login({ email, password });
  };

  return (
    <Form name="login" onFinish={onFinish}>
      <Koi />

      <Title>Iniciar sessão</Title>
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
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          type="password"
          placeholder="Palavra-passe"
        />
      </Form.Item>

      <Form.Item
        className={styles.button}
        validateStatus={errors?.detail && "error"}
        help={!errors || "Autenticação inválida"}
      >
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          className={styles.submit}
        >
          Iniciar sessão
        </Button>
      </Form.Item>

      <Text>
        Ainda não tens uma conta? <Link href="/signup">Regista-te aqui</Link>
      </Text>
      <div>
        <Text>
          <Link href="">Esqueci-me da palavra-passe</Link>
        </Text>
      </div>
    </Form>
  );
}

export default Login;
