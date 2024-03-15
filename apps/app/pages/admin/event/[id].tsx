import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { withAuth } from "~/components/Auth";
import { Avatar, Button, Col, Divider, List, Row, Typography } from "antd";
import { useEvent } from "~/hooks/events";
import AppLayout from "~/layouts/AppLayout";
import Event from "~/components/Event";
import Belt from "~/components/Belt";
import Availability from "~/components/Availability";
import { notifyError, notifyInfo } from "~/components/Notification";
import { getEnrolledNinjas, getMentorsAvailabilities } from "bokkenjs";

const { Title } = Typography;

function EventPage() {
  const router = useRouter();
  const { id: event_id } = router.query;

  const { data: event, isLoading } = useEvent(event_id as string);
  const [enrolledNinjas, setEnrolledNinjas] = useState([]);
  const [availableMentors, setAvailableMentors] = useState<any[]>([]);
  const [unavailableMentors, setUnavailableMentors] = useState<any[]>([]);
  const [available, setAvailable] = useState<boolean>(true);

  useEffect(() => {
    getMentorsAvailabilities(event_id as string)
      .then((response: any) => {
        setAvailableMentors(response.availabilities);
        setUnavailableMentors(response.unavailabilities);
      })
      .catch((_error) => {
        notifyError(
          "Ocorreu um erro",
          "Não foi possível obter os mentores disponíveis"
        );
      });
  }, [event_id]);

  useEffect(() => {
    getEnrolledNinjas(event_id as string)
      .then((response) => setEnrolledNinjas(response.data))
      .catch((error) => {
        notifyError(
          "Ocorreu um erro",
          "Não foi possível obter os ninjas inscritos"
        );
      });
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
          enrolledNinjas={0}
        />
      </Row>
      <Divider />
      <>
        {available ? (
          <Availability
            title="Mentores disponíveis"
            mentors={availableMentors}
            available={available}
            setAvailable={setAvailable}
          />
        ) : (
          <Availability
            title="Mentores indisponíveis"
            mentors={unavailableMentors}
            available={available}
            setAvailable={setAvailable}
          />
        )}
      </>
      <Divider />
      <Col>
        <Title level={2}>Ninjas inscritos ({enrolledNinjas.length})</Title>
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
