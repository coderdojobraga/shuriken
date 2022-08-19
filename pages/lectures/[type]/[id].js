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
  });

  return (
    <AppLayout>
      <Row justify="space-around" gutter={[10, 10]}>
        {lectures.map((lecture) => (
          <Card
            key={lecture.id}
            size="large"
            title={lecture.event.title || "Sem título"}
            style={{ width: 300, marginTop: 16 }}
            actions={[
              <Link key={`link ${lecture.id}`} href={`/`}>
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
                <Avatar
                  src={lecture.mentor.photo}
                  size="large"
                  alt={`Avatar ${lecture.mentor.first_name} ${lecture.mentor.last_name}`}
                  icon={<UserOutlined />}
                />
              </Col>
              <Col>
                <Text>{`${lecture.mentor.first_name} ${lecture.mentor.last_name}`}</Text>
              </Col>
            </Row>
          </Card>
        ))}
      </Row>
    </AppLayout>
  );
}

export default withAuth(Lectures);
