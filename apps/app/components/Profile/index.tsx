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
import { EUser, getNinjasAsAdmin, updateGuardianAsAdmin } from "bokkenjs";
import Link from "next/link";
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
  const [date, setDate] = useState<string>("");
  const [guardian, setGuardians] = useState<any | null>([]);

  useEffect(() => {
    const fetchUserByRole = async () => {
      try {
        const response = await api.getUserByRole({ id, role });
        setInfo(response.data);
      } catch (error) {
        notifyError(
          "Ocorreu um erro",
          "Não foi possível obter os dados do utilizador"
        );
      }
    };

    const fetchMentorSkills = async () => {
      try {
        const response = await api.getMentorSkills(id);
        setSkills(response.data);
      } catch (error) {
        notifyError(
          "Ocorreu um erro",
          "Não foi possível obter os conhecimentos do mentor"
        );
      }
    };

    const fetchNinjaBadges = async () => {
      try {
        const response = await api.getNinjaBadges(id);
        setBadges(response.data);
      } catch (error) {
        notifyError(
          "Ocorreu um erro",
          "Não foi possível obter os crachás do ninja"
        );
      }
    };

    const fetchNinjaFiles = async () => {
      try {
        const response = await api.getNinjaFiles(id);
        setProjects(response.data);
      } catch (error) {
        notifyError(
          "Ocorreu um erro",
          "Não foi possível obter os ficheiros do ninja"
        );
      }
    };

    const fetchNinjaSkills = async () => {
      try {
        const response = await api.getNinjaSkills(id);
        setSkills(response.data);
      } catch (error) {
        notifyError(
          "Ocorreu um erro",
          "Não foi possível obter as linguagens do ninja"
        );
      }
    };

    fetchUserByRole();

    if (role === EUser.Mentor) {
      fetchMentorSkills();
    } else if (role === EUser.Ninja) {
      fetchNinjaBadges();
      fetchNinjaFiles();
      fetchNinjaSkills();
    }
  }, [id, role]);

  useEffect(() => {
    if (info.since) {
      setDate(moment(info.since).format("DD/MM/YYYY"));
    }
  }, [info.since]);

  useEffect(() => {
    if (role === EUser.Ninja) {
      api
        .getGuardian(info.guardian_id)
        .then((response: any) => setGuardians(response.data))
        .catch((error: any) => {});
    }
  }, [info.guardian_id, role]);
  console.log(badges);

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
          <Col span={25}>
            <Title level={2} style={{ marginBottom: "0px" }}>
              {info.first_name} {info.last_name}
            </Title>
            <p style={{ fontSize: "18px", marginBottom: "3px" }}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
              {role === EUser.Ninja && (
                <>
                  <span style={{ marginLeft: "6px", fontSize: "18px" }}>
                    de{" "}
                    <Link href={`/profile/guardian/${guardian.id}`}>
                      <a>
                        {guardian.first_name} {guardian.last_name}
                      </a>
                    </Link>
                  </span>
                </>
              )}
            </p>
            <p style={{ fontSize: "14px", marginBottom: "3px" }}>
              Conta criada em: {date}
            </p>
            <p style={{ marginBottom: "5px", marginTop: "3px" }}>
              <Belt belt={info.belt} />
            </p>
            <p style={{ marginBottom: "2px" }}>
              <Space style={{ fontSize: 20 }}>
                {info?.socials?.map((social: any) =>
                  social?.name === "discord" || social?.name === "slack" ? (
                    <a key={social.id} title={social.username}>
                      {socials.ICONS[social.name as keyof typeof socials.URLS]}
                    </a>
                  ) : (
                    <a
                      key={social.id}
                      target="_blank"
                      rel="noreferrer"
                      href={`${
                        socials.URLS[social.name as keyof typeof socials.URLS]
                      }${social.username}`}
                    >
                      {socials.ICONS[social.name as keyof typeof socials.URLS]}
                    </a>
                  )
                )}
              </Space>
            </p>
            <p>
              {skills.map((s: any) => (
                <div
                  style={{
                    display: "inline-block",
                    fontSize: 20,
                    marginRight: "6px",
                    color: "#424549",
                  }}
                  key={s.id}
                >
                  {getIcon(s.name)}
                </div>
              ))}
            </p>
          </Col>
        </Space>
      </Row>

      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Eventos" key="1">
          <Timeline mode="alternate">
            <Col span={21}>
              <Timeline.Item dot={<ClockCircleOutlined />}>
                Registou-se na plataforma{" "}
                {moment(info.since).locale("pt").fromNow()}
              </Timeline.Item>
            </Col>
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
