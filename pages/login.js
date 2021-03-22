import { Alert, Button, Form, Input, Row, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useAuth } from "../components/Auth";
import Layout from "../components/Layout";
import LoadingLayout from "../components/Layout/LoadingLayout";
import LinkTo from "../components/utils/LinkTo";

import styles from "../styles/Forms.module.css";

function Signup() {
  const [form] = Form.useForm();
  const { user, errors, isLoading, login } = useAuth();
  const router = useRouter();

  if (user) {
    router.push("/profile");
  }

  if (isLoading || user) {
    return <LoadingLayout />;
  }

  return (
    <Layout>
      <Typography.Text>Welcome back!</Typography.Text>
      <Typography.Title>CoderDojo Braga</Typography.Title>
      <Form
        form={form}
        name="login"
        className={styles.form}
        onFinish={({ email, password }) => login({ email, password })}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          extra={errors?.email ? errors.email.join("\n") : undefined}
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          extra={errors?.password ? errors.password.join("\n") : undefined}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        {errors?.detail ? (
          <Form.Item>
            <Alert message={errors.detail} type="error" showIcon />
          </Form.Item>
        ) : null}

        <Form.Item>
          <Row type="flex" align="middle">
            <Button type="primary" loading={isLoading} block htmlType="submit">
              Login
            </Button>
            <Typography.Text className={styles.note}>
              Do not have an account yet?{" "}
              <LinkTo href="/signup">Register now</LinkTo>
            </Typography.Text>
          </Row>
        </Form.Item>
      </Form>
    </Layout>
  );
}

export default Signup;
