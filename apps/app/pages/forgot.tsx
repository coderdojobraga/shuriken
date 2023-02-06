import { useState } from "react";
import { withoutAuth } from "~/components/Auth";
import AuthenticationLayout from "~/layouts/AuthenticationLayout";
import { Button, Form, Input, Typography, notification } from "antd";
import { MailOutlined } from "@ant-design/icons";
import Visibility from "~/components/Visibility";
import * as api from "bokkenjs";
import { notifyError } from "~/components/Notification";

interface IFormFields {
  email: string;
}

const Forgot = () => {
  const { Title, Text } = Typography;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [requestSent, setRequestSent] = useState<boolean>(false);

  const submit = ({ email }: IFormFields) => {
    setIsLoading(false);

    api
      .requestToken({ email })
      .then((_) => {
        setRequestSent(true);
        setIsLoading(false);
      })
      .catch((error) => {
        notifyError("Ocorreu um erro", "Tente novamente mais tarde");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <AuthenticationLayout>
      <Visibility visible={!requestSent}>
        <Form name="login" onFinish={submit}>
          <Title>Recuperar Palavra Passe</Title>

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

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Recuperar
            </Button>
          </Form.Item>
        </Form>
      </Visibility>

      <Visibility visible={requestSent}>
        <Title>Verifique a sua caixa de correio.</Title>

        <Text>
          Enviámos um email com o link para alterar as suas credenciais.
        </Text>
      </Visibility>
    </AuthenticationLayout>
  );
};

export default withoutAuth(Forgot);
