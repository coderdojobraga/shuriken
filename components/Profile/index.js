import { useEffect, useState } from "react";
import {
  Avatar,
  Col,
  Empty,
  Row,
  Space,
  Tabs,
  Timeline,
  Typography,
  notification,
} from "antd";
import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
import moment from "moment";
import Badge from "~/components/Badge";
import Belt from "~/components/Belt";
import Document from "~/components/Document";
import LinkTo from "~/components/utils/LinkTo";
import * as api from "~/lib/api";
import * as USER from "~/lib/user";
import * as SOCIAL from "~/lib/social";

import styles from "./style.module.css";

const { TabPane } = Tabs;
const { Title } = Typography;

function Profile({ id, type }) {
  const [info, setInfo] = useState({});
  const [badges, setBadges] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api
      .getUserByType({ id, type })
      .then((response) => setInfo(response.data))
      .catch((error) => notification["error"](error.data?.errors));

    if (type == USER.ROLES.NINJA) {
      api
        .getNinjaBadges(id)
        .then((response) => setBadges(response.data))
        .catch((error) => notification["error"](error.data?.errors));

      api
        .getNinjaFiles(id)
        .then((response) => setProjects(response.data))
        .catch((error) => notification["error"](error.data?.errors));
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

            {("belt" in info) &&
              <Col span={24}>
                <Belt belt={info.belt} />
              </Col>
            }

            <Col span={24}>
              <Space style={{ fontSize: 30 }}>
                {info?.socials?.map((social) => (
                  <LinkTo
                    key={social.id}
                    target="_blank"
                    href={`${SOCIAL.URLS[social.name]}/${social.username}`}
                  >
                    {SOCIAL.ICONS[social.name]}
                  </LinkTo>
                ))}
              </Space>
            </Col>
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
        {type === USER.ROLES.NINJA && (
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
        )}
        <TabPane tab="Projetos" key="3">
          {projects.length == 0 ? (
            <Empty
              description="Sem Projetos"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ) : (
            <Row justify="start" align="middle">
              {projects.map((project) => (
                <Col key={project.id} {...{ xs: 24, md: 12, xl: 8, xxl: 6 }}>
                  <Space>
                    <Document {...project} />
                  </Space>
                </Col>
              ))}
            </Row>
          )}
        </TabPane>
      </Tabs>
    </>
  );
}

export default Profile;
