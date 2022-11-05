import { useEffect, useState } from "react";
import Link from "next/link";
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
import moment from "moment";
import Badge from "~/components/Badge";
import Belt from "~/components/Belt";
import Document from "~/components/Document";
import * as api from "bokkenjs";
import * as social from "~/lib/social";

import styles from "./style.module.css";
import { EUser } from "bokkenjs";

const { TabPane } = Tabs;
const { Title } = Typography;

interface Props {
  id: string;
  role: EUser;
}

function Profile({ id, role }: Props) {
  const [info, setInfo] = useState<any>({});
  const [badges, setBadges] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    api
      .getUserByRole({ id, role })
      .then((response) => setInfo(response.data))
      .catch((error) => notification["error"](error.data?.errors));

    if (role == EUser.Mentor) {
      api
        .getMentorSkills(id)
        .then((response) => setSkills(response.data))
        .catch((error) => notification["error"](error.data?.errors));
    } else if (role == EUser.Ninja) {
      api
        .getNinjaBadges(id)
        .then((response) => setBadges(response.data))
        .catch((error) => {});

      api
        .getNinjaFiles(id)
        .then((response) => setProjects(response.data))
        .catch((error) => notification["error"](error.data?.errors));

      api
        .getNinjaSkills(id)
        .then((response) => setSkills(response.data))
        .catch((error) => notification["error"](error.data?.errors));
    }
  }, [id, role]);

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
                {role}
              </Title>
            </Col>

            <Col span={24}>
              {skills.map((s) => (
                <Tag key={s.id}>{s.name}</Tag>
              ))}
            </Col>

            {"belt" in info && (
              <Col span={24}>
                <Belt belt={info.belt} />
              </Col>
            )}

            <Col span={24}>
              <Space style={{ fontSize: 30 }}>
                {info?.socials?.map((social: any) => (
                  <Link
                    key={social.id}
                    target="_blank"
                    href={`${social.URLS[social.name]}/${social.username}`}
                  >
                    {social.ICONS[social.name]}
                  </Link>
                ))}
              </Space>
            </Col>
          </Row>
        </Space>
      </Row>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Eventos" key="1">
          <Timeline mode="alternate">
            <Timeline.Item dot={<ClockCircleOutlined />}>
              Registou-se na plataforma{" "}
              {moment(info.since).locale("pt").fromNow()}
            </Timeline.Item>
          </Timeline>
        </TabPane>
        {role === EUser.Ninja && (
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
