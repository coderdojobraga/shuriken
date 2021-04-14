import {
  Avatar,
  Badge,
  Col,
  Descriptions,
  Space,
  Row,
  Tabs,
  Timeline,
  notification,
} from "antd";
import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAuth } from "~/components/Auth";
import * as api from "~/lib/utils/api";

const { TabPane } = Tabs;

function Profile({ id, type }) {
  const { user } = useAuth();
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (id in [user.guardian_id, user.ninja_id, user.mentor_id]) {
      setInfo(user);
    } else {
      api
        .getUserByType({ id, type })
        .then((response) => setInfo(response.data))
        .catch((error) => notification["error"](error.data));
    }
  }, [id, type, user]);

  return (
    <>
      <Row justify="center" align="middle">
        <Space>
          <Badge.Ribbon text="Cinturão Vermelho" color="red">
            <Row
              justify="center"
              align="middle"
              style={{ maxWidth: "500px", padding: "30px" }}
            >
              <Space>
                <Col>
                  <Avatar
                    size={{
                      xs: 100,
                      sm: 200,
                      md: 200,
                      lg: 200,
                      xl: 200,
                      xxl: 200,
                    }}
                    src={info?.photo}
                    icon={<UserOutlined />}
                  />
                </Col>
                <Col>
                  <Descriptions
                    title={`${info?.first_name} ${info?.last_name}`}
                  >
                    <Descriptions.Item>{info?.email}</Descriptions.Item>
                  </Descriptions>
                </Col>
              </Space>
            </Row>
          </Badge.Ribbon>
        </Space>
      </Row>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Events" key="1">
          <Timeline mode="alternate">
            <Timeline.Item>
              Participou no desafio Coolest Projects
            </Timeline.Item>
            <Timeline.Item color="red">
              Faltou à sessão 2015-09-01
            </Timeline.Item>
            <Timeline.Item color="green">
              Esteve na sessão 2015-09-01
            </Timeline.Item>
            <Timeline.Item dot={<ClockCircleOutlined />}>
              Critou conta na plataforma
            </Timeline.Item>
          </Timeline>
        </TabPane>
        <TabPane tab="Badges" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Projects" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </>
  );
}

export default Profile;
