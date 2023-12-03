import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Card, Col, Row, Typography, notification } from "antd";
import { CalendarOutlined, EditOutlined } from "@ant-design/icons";
import { withAuth } from "~/components/Auth";
import AppLayout from "~/layouts/AppLayout";
import * as api from "bokkenjs";
import moment from "moment";
import { EUser } from "bokkenjs";
import { notifyError } from "~/components/Notification";

const { Title, Text } = Typography;

function Lectures() {
  const router = useRouter();
  const { role, id } = router.query;

  const [lectures, setLectures] = useState<any[]>([]);
  const [ninja, setNinja] = useState<any>({});

  useEffect(() => {
    switch (role) {
      case EUser.Mentor:
        api
          .getMentorLectures(id as string)
          .then((response) => setLectures(response.data))
          .catch((error) => {
            notifyError(
              "Ocorreu um erro",
              "Não foi possível obter as sessões do mentor",
            );
          });
        break;
      case EUser.Ninja:
        api
          .getNinjaLectures(id as string)
          .then((response) => setLectures(response.data))
          .catch((error) => {
            notifyError(
              "Ocorreu um erro",
              "Não foi possível obter as sessões do ninja",
            );
          });
        break;
      default:
        router.push("/404");
        break;
    }
    if (role == EUser.Ninja) {
      api
        .getNinja(id as string)
        .then((response) => setNinja(response.data))
        .catch((error) => {
          notifyError(
            "Ocorreu um erro",
            "Não foi possível obter os dados do ninja",
          );
        });
    }
  }, [router, role, id]);

  return (
    <AppLayout>
      <Row gutter={[10, 10]}>
        <Title level={2}>
          {role == EUser.Ninja
            ? `Sessões ${ninja.first_name} ${ninja.last_name}`
            : "Sessões"}
        </Title>
      </Row>
      <Row justify="space-around" gutter={[10, 10]}>
        {lectures.map((lecture) => (
          <Card
            key={lecture.id}
            title={lecture.event.title || "Sem título"}
            style={{ width: 300, marginTop: 16 }}
            actions={[
              <Link key={`link ${lecture.id}`} href={`/lecture/${lecture.id}`}>
                <a>
                  <EditOutlined key="edit" />
                </a>
              </Link>,
            ]}
          >
            <Row align="middle" gutter={[16, 16]}>
              <Col>
                <CalendarOutlined
                  style={{
                    verticalAlign: "middle",
                    paddingBottom: "2px",
                  }}
                />
              </Col>
              <Col>
                <Text>
                  {moment(new Date(lecture.event.start_time)).format(
                    "DD/MM/YYYY",
                  )}
                </Text>
              </Col>
            </Row>
            <Row align="middle" gutter={[16, 16]}>
              <Col>
                <Text>{`Mentor(a): ${lecture.mentor.first_name} ${lecture.mentor.last_name}`}</Text>
              </Col>
            </Row>
            <Row align="middle" gutter={[16, 16]}>
              <Col>
                <Link href={`/profile/ninja/${lecture.ninja.id}`}>
                  <a>
                    <Text>{`Ninja: ${lecture.ninja.first_name} ${lecture.ninja.last_name}`}</Text>
                  </a>
                </Link>
              </Col>
            </Row>
          </Card>
        ))}
      </Row>
    </AppLayout>
  );
}

export default withAuth(Lectures);
