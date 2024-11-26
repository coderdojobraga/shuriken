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
} from "antd";
import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
import moment from "moment";
import "moment/locale/pt";
import Badge from "~/components/Badge";
import Belt from "~/components/Belt";
import Document from "~/components/Document";
import * as api from "bokkenjs";
import * as socials from "~/lib/social";
import { notifyError, notifyInfo } from "~/components/Notification";
import styles from "./style.module.css";
import { API_URL, EUser } from "bokkenjs";

import { BsFileEarmarkPersonFill } from "react-icons/bs";

import { getIcon } from "~/lib/utils";

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
  const [date, setDate] = useState<String>("");
  const [avatarPreview] = useState<null | string>();
  useEffect(() => {
    api
      .getUserByRole({ id, role })
      .then((response) => setInfo(response.data))
      .catch((error) => {
        notifyError(
          "Ocorreu um erro",
          "Não foi possível obter os dados do utilizador"
        );
      });

    if (role == EUser.Mentor) {
      api
        .getMentorSkills(id)
        .then((response) => setSkills(response.data))
        .catch((error) => {
          notifyError(
            "Ocorreu um erro",
            "Não foi possível obter os conhecimentos do mentor"
          );
        });
    } else if (role == EUser.Ninja) {
      api
        .getNinjaBadges(id)
        .then((response) => setBadges(response.data))
        .catch((error) => {
          notifyError(
            "Ocorreu um erro",
            "Não foi possível obter os crachás do ninja"
          );
        });

      api
        .getNinjaFiles(id)
        .then((response) => setProjects(response.data))
        .catch((error) => {
          notifyError(
            "Ocorreu um erro",
            "Não foi possível obter os ficheiros do ninja"
          );
        });

      api
        .getNinjaSkills(id)
        .then((response) => setSkills(response.data))
        .catch((error) => {
          notifyError(
            "Ocorreu um erro",
            "Não foi possível obter as linguagens do ninja"
          );
        });
    }
  }, [id, role]);

  useEffect(() => {
    setDate(moment(info.since).format("DD/MM/YYYY"));
  }, [info]);

  let avatarSrc;
  if (
    !avatarPreview &&
    typeof info?.photo === "string" &&
    info?.photo.startsWith("/uploads/")
  ) {
    avatarSrc = `${API_URL}${info.photo}`;
  } else {
    avatarSrc = info?.photo;
  }
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
            src={avatarSrc}
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
                <BsFileEarmarkPersonFill /> {role}
              </Title>
            </Col>
            <Col span={24}>
              <Title level={5}>Conta criada em: {date}</Title>
            </Col>

            {"belt" in info && (
              <Col span={24}>
                <Belt belt={info.belt} />
              </Col>
            )}

            <Col span={24}>
              <Space style={{ fontSize: 20 }}>
                {info?.socials?.map((social: any) =>
                  social?.name == "discord" || social?.name == "slack" ? (
                    <a title={social.username}>
                      {socials.ICONS[social.name as keyof typeof socials.URLS]}
                    </a>
                  ) : (
                    <a
                      key={social.id}
                      target="_blank"
                      rel="noreferrer"
                      href={`${
                        socials.URLS[social.name as keyof typeof socials.URLS]
                      }/${social.username}`}
                    >
                      {socials.ICONS[social.name as keyof typeof socials.URLS]}
                    </a>
                  )
                )}
              </Space>
            </Col>

            <Col span={24}>
              {skills.map((s) => (
                <Tag key={s.id}>
                  {getIcon(s.name)} {s.name}
                </Tag>
              ))}
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
