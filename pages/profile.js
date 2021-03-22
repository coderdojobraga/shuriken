import { Avatar, Col, Row, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Layout from "../components/Layout";
import { useAuth, withAuth } from "../components/Auth";

function Profile() {
  const { user } = useAuth();

  return (
    <Layout>
      <Row justify="center" align="middle">
        <Col>
          <Avatar size={200} src={user?.photo} icon={<UserOutlined />} />
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col>
          <Typography.Title
            level={3}
          >{`${user?.first_name} ${user?.last_name}`}</Typography.Title>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col>
          <Typography.Text>{user?.email}</Typography.Text>
        </Col>
      </Row>
    </Layout>
  );
}

export default withAuth(Profile);
