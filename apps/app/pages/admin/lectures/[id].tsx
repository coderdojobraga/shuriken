import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { withAuth } from "~/components/Auth";
import { Avatar, Col, Divider, List, Row, Typography } from "antd";
import { useEvent } from "~/hooks/events";
import AppLayout from "~/layouts/AppLayout";
import Event from "~/components/Event";
import Belt from "~/components/Belt";
import { notifyInfo } from "~/components/InfoNotification";
import { getAvailableMentors, getEnrolledNinjas } from "bokkenjs";

const { Title } = Typography;

function EventPage() {
  const router = useRouter();
  const { id: event_id } = router.query;

  const { data: event, isLoading } = useEvent(event_id as string);

  const [mentors, setMentors] = useState<any[]>([]);
  const [enrolledNinjas, setEnrolledNinjas] = useState([]);

  useEffect(() => {
    getAvailableMentors(event_id as string)
      .then((response: any) => {
        setMentors(response.data);
      })
      .catch(notifyInfo);
  }, [event_id]);

  useEffect(() => {
    getEnrolledNinjas(event_id as string)
      .then((response) => setEnrolledNinjas(response.data))
      .catch(notifyInfo);
  }, [event_id]);

  return (
    <AppLayout>
      <Title level={2}>Detalhes do evento</Title>
      <Row align="top" justify="space-between" style={{ marginBottom: "8px" }}>
        <Event
          event={event}
          collapsed={false}
          details={true}
          isLoading={isLoading}
        />
      </Row>
      <Divider />
      <Col>
        <Title level={2}>Mentores disponíveis</Title>
        <List
          itemLayout="vertical"
          dataSource={mentors}
          renderItem={(mentor: any) => (
            <List.Item>
              <Link href={`/profile/mentor/${mentor.id}`}>
                <List.Item.Meta
                  avatar={<Avatar size={64} src={mentor.photo} />}
                  title={`${mentor.first_name} ${mentor.last_name}`}
                  description={mentor.notes ? `Notas: ${mentor.notes}` : ""}
                />
              </Link>
              <div style={{ fontWeight: "500" }}>
                {mentor.is_available ? "Disponível" : "Não disponível"}
              </div>
            </List.Item>
          )}
        />
      </Col>
      <Divider />
      <Col>
        <Title level={2}>Ninjas inscritos</Title>
        <List
          itemLayout="vertical"
          dataSource={enrolledNinjas}
          renderItem={({ ninja }: any) => (
            <List.Item>
              <Link href={`/profile/ninja/${ninja.id}`}>
                <List.Item.Meta
                  avatar={<Avatar size={64} src={ninja.photo} />}
                  title={`${ninja.first_name} ${ninja.last_name}`}
                  description={<Belt belt={ninja.belt} />}
                />
              </Link>
            </List.Item>
          )}
        />
      </Col>
    </AppLayout>
  );
}

export default withAuth(EventPage);
