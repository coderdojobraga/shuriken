import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar, Card, Row, Col, Typography } from "antd";
import {
  CalendarOutlined,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { withAuth } from "~/components/Auth";
import AppLayout from "~/components/layouts/AppLayout";
import LinkTo from "~/components/utils/LinkTo";
import * as api from "~/lib/api";
import * as user from "~/lib/user";
import Belt from "~/components/Belt";
import moment from "moment";

const { Meta } = Card;

function Lectures() {
  const { Title, Text } = Typography;

  const router = useRouter();
  const { type, id } = router.query;

  const [lectures, setLectures] = useState([]);
  const [ninja, setNinja] = useState({});

  useEffect(() => {
    switch (type) {
      case user.ROLES.MENTOR:
        api
          .getMentorLectures(id)
          .then((response) => setLectures(response.data))
          .catch((error) => notification["error"](error.data?.errors));
        break;
      case user.ROLES.NINJA:
        api
          .getNinjaLectures(id)
          .then((response) => setLectures(response.data))
          .catch((error) => notification["error"](error.data?.errors));
        break;
      default:
        router.push("/404");
        break;
    }
    if (type == user.ROLES.NINJA) {
      api
        .getNinja(id)
        .then((response) => setNinja(response.data))
        .catch((error) => notification["error"](error.data?.errors));
    }
  }, [router, type, id]);

  return (
    <AppLayout>
      <Row gutter={[10, 10]}>
        <Title level={2}>
          {type == user.ROLES.MENTOR
            ? "Sessões"
            : `Sessões ${ninja.first_name} ${ninja.last_name}`}
        </Title>
      </Row>
      <Row justify="space-around" gutter={[10, 10]}>
        {lectures.map((lecture) => (
          <Card
            key={lecture.id}
            size="large"
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
                    "DD/MM/YYYY"
                  )}
                </Text>
              </Col>
            </Row>
            <Row align="middle" gutter={[16, 16]}>
              <Col>
                <Text>{`Mentor(a): ${lecture.mentor.first_name} ${lecture.mentor.last_name}`}</Text>
              </Col>
            </Row>
          </Card>
        ))}
      </Row>
    </AppLayout>
  );
}

export default withAuth(Lectures);
