import { Alert, Button, Form, Input, Radio, Row, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useAuth, withoutAuth } from "~/components/Auth";
import ContentLayout from "~/components/layouts/ContentLayout";
import LinkTo from "~/components/utils/LinkTo";

import styles from "~/styles/Forms.module.css";

function Signup() {
  const defaultRole = "guardian";
  const [form] = Form.useForm();
  const { errors, isLoading, sign_up } = useAuth();

  return (
    <ContentLayout>
      <Row justify="center">
        <Typography.Text>Join CoderDojo Braga!</Typography.Text>
      </Row>
      <Row justify="center">
        <Typography.Title>Create an Account</Typography.Title>
      </Row>
      <Row justify="center">
        <Form
          form={form}
          name="signup"
          onFinish={({ email, password, role }) =>
            sign_up({ email, password, role })
          }
          initialValues={{ role: defaultRole }}
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

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error("The passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item name="role" extra={errors.role}>
            <Row type="flex" justify="center" align="middle">
              <Radio.Group defaultValue={defaultRole} buttonStyle="solid">
                <Radio.Button value="guardian">Guardian</Radio.Button>
                <Radio.Button value="mentor">Mentor</Radio.Button>
                <Radio.Button value="ninja">Ninja</Radio.Button>
              </Radio.Group>
            </Row>
          </Form.Item>

          {errors?.detail ? (
            <Form.Item>
              <Alert message={errors.detail} type="error" showIcon />
            </Form.Item>
          ) : null}

          <Form.Item>
            <Row type="flex" align="middle">
              <Button
                loading={isLoading}
                type="primary"
                htmlType="submit"
                block
              >
                Register
              </Button>
              <Typography.Text className={styles.note}>
                Already have an account? <LinkTo href="/login">Login</LinkTo>
              </Typography.Text>
            </Row>
          </Form.Item>
        </Form>
      </Row>
    </ContentLayout>
  );
}

export default withoutAuth(Signup);
