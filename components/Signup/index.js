import { useState } from "react";
import {
  Typography,
  Form,
  Input,
  Radio,
  Button,
  Checkbox,
  Tooltip,
} from "antd";
import {
  MailOutlined,
  LockOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useAuth } from "~/components/Auth";
import Link from "next/link";

import styles from "./style.module.css";

function Signup() {
  const { Title, Text } = Typography;
  const { errors, isLoading, sign_up } = useAuth();

  const [size, setSize] = useState("");

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const onFinish = ({ email, password, role }) => {
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
        <Radio.Group
          className={styles.select}
          value={size}
          onChange={handleSizeChange}
        >
          <Radio.Button className={styles.option} value="guardian">
            Guardião
          </Radio.Button>
          <Radio.Button className={styles.option} value="mentor">
            Mentor
          </Radio.Button>
          <Tooltip
            className={styles.option}
            title="Inicia sessão como Guardião para inscreveres um Ninja"
          >
            <Radio.Button disabled>
              Ninja &#160;
              <InfoCircleOutlined />
            </Radio.Button>
          </Tooltip>
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
            <Link href="/privacy_policy.pdf" target="_blank">
              política de privacidade
            </Link>{" "}
            e os{" "}
            <Link href="/terms_of_service.pdf" target="_blank">
              termos de uso
            </Link>
          </Text>
        </Checkbox>
      </Form.Item>

      <Form.Item
        className={styles.button}
        validateStatus={errors && "error"}
        help={errors?.email && "Email já registado"}
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
        Já tens uma conta? <Link href="/login">Inicia sessão aqui</Link>
      </Text>
    </Form>
  );
}

export default Signup;
