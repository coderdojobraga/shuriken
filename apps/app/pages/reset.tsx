import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { withoutAuth } from "~/components/Auth";
import AuthenticationLayout from "~/layouts/AuthenticationLayout";
import { Button, Form, Input, Typography, notification } from "antd";
import { LockOutlined } from "@ant-design/icons";
import Visibility from "~/components/Visibility";
import * as api from "bokkenjs";
import { notifyError } from "~/components/Notification";

interface IFormFields {
  password: string;
  passwordConfirmation: string;
}

const Forgot = () => {
  const router = useRouter();
  const { token } = router.query;

  const { Title, Text } = Typography;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [requestSent, setRequestSent] = useState<boolean>(false);

  const submit = ({ password, passwordConfirmation }: IFormFields) => {
    if (password == passwordConfirmation) {
      setIsLoading(true);
      api
        .resetPassword({ token, password })
        .then((_) => {
          setIsLoading(false);
          setRequestSent(true);
        })
        .catch((error) => {
          notifyError(
            "Ocorreu um erro",
            "Tente novamente mais tarde. Se o problema persistir, peça outro link para alterar a password"
          );
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <AuthenticationLayout>
      <Visibility visible={!requestSent}>
        <Form name="login" onFinish={submit}>
          <Title>Alterar Palavra Passe</Title>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Insira a nova palavra passe!",
              },
              {
                min: 8,
                message: "Password tem de ter no mínimo 8 caracteres.",
              },
            ]}
            hasFeedback
          >
            <Input
              prefix={<LockOutlined />}
              placeholder="Nova palavra passe"
              type="password"
            />
          </Form.Item>

          <Form.Item
            name="passwordConfirmation"
            rules={[
              {
                required: true,
                message: "Confirme a palavra passe!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("As palavras passe não coincidem")
                  );
                },
              }),
            ]}
            dependencies={["password"]}
            hasFeedback
          >
            <Input
              prefix={<LockOutlined />}
              placeholder="Confirmar palavra passe"
              type="password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Alterar Palavra Passe
            </Button>
          </Form.Item>
        </Form>
      </Visibility>

      <Visibility visible={requestSent}>
        <Title>Palavra passe alterada com sucesso</Title>

        <Button type="primary" htmlType="submit" loading={isLoading}>
          <Link href="/login">Iniciar sessão</Link>
        </Button>
      </Visibility>
    </AuthenticationLayout>
  );
};

export default withoutAuth(Forgot);
