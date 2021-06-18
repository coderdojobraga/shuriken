import { useEffect, useState } from "react";
import {
  Avatar,
  Col,
  Empty,
  Row,
  Space,
  Tabs,
  Tag,
  Timeline,
  Typography,
  notification,
} from "antd";
import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
import Badge from "~/components/Badge";
import moment from "moment";
import * as api from "~/lib/utils/api";
import * as BELT from "~/lib/utils/belt";
import * as USER from "~/lib/utils/user";

import styles from "./style.module.css";

const { TabPane } = Tabs;
const { Title } = Typography;

function Profile({ id, type }) {
  const [info, setInfo] = useState({});
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    api
      .getUserByType({ id, type })
      .then((response) => setInfo(response.data))
      .catch((error) => notification["error"](error.data));

    if (type == USER.TYPES.NINJA) {
      api
        .getNinjaBadges(id)
        .then((response) => setBadges(response.data))
        .catch((error) => notification["error"](error.data));
    }
  }, [id, type]);

  return (
    <>
      <Row justify="center" align="middle">
        <Space size="large">
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
          <Row justify="center" align="middle">
            <Col span={24}>
              <Title level={2}>
                {info.first_name} {info.last_name}
              </Title>
            </Col>
            <Col span={24}>
              <Title className={styles.capitalize} level={4}>
                {type}
              </Title>
            </Col>
            {info.belt ? (
              <Col span={24}>
                <Tag
                  className={!info.belt ? styles.nobelt : styles.capitalize}
                  color={(info.belt !== BELT.LEVELS.WHITE && info.belt) || null}
                >
                  {BELT.PT[info.belt]}
                </Tag>
              </Col>
            ) : null}
          </Row>
        </Space>
      </Row>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Eventos" key="1">
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
              Registou-se na plataforma{" "}
              {moment(info.since).locale("pt").fromNow()}
            </Timeline.Item>
          </Timeline>
        </TabPane>
        <TabPane tab="Crachás" key="2">
          {badges.length == 0 ? (
            <Empty
              description="Sem Crachás"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ) : (
            <Row justify="start" align="middle">
              {badges.map((badge) => (
                <Col key={badge.id} {...{ xs: 24, md: 12, xl: 8, xxl: 6 }}>
                  <Space>
                    <Badge {...badge} />
                  </Space>
                </Col>
              ))}
            </Row>
          )}
        </TabPane>
        <TabPane tab="Projetos" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </>
  );
}

export default Profile;
