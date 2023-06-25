import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { withAuth } from "~/components/Auth";
import { Avatar, Button, Col, Divider, List, Row, Typography } from "antd";
import { useEvent } from "~/hooks/events";
import AppLayout from "~/layouts/AppLayout";
import Event from "~/components/Event";
import Belt from "~/components/Belt";
import { notifyError, notifyInfo } from "~/components/Notification";
import {
  getAvailableMentors,
  getEnrolledNinjas,
  getUnavailableMentors,
} from "bokkenjs";

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
    getAvailableMentors(event_id as string)
      .then((response: any) => {
        setAvailableMentors(response.availabilities);
      })
      .catch((_error) => {
        notifyError(
          "Ocorreu um erro",
          "Não foi possível obter os mentores disponíveis"
        );
      });

    getUnavailableMentors(event_id as string)
      .then((response: any) => {
        setUnavailableMentors(response.unavailabilities);
      })
      .catch((_error) => {
        notifyError(
          "Ocorreu um erro",
          "Não foi possível obter os mentores indisponíveis"
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
        />
      </Row>
      <Divider />
      <>
        {available ? (
          <>
            <Row style={{ display: "flex", justifyContent: "space-between" }}>
              <Title level={2}>Mentores disponíveis</Title>
              <Button
                type="primary"
                style={{ float: "right" }}
                onClick={(_) => setAvailable(!available)}
              >
                Mentores indisponíveis
              </Button>
            </Row>
            <List
              itemLayout="vertical"
              dataSource={availableMentors}
              renderItem={(mentor: any) => (
                <List.Item style={{ cursor: "pointer" }}>
                  <Link href={`/profile/mentor/${mentor.id}`}>
                    <List.Item.Meta
                      avatar={<Avatar size={64} src={mentor.photo} />}
                      title={`${mentor.first_name} ${mentor.last_name}`}
                      description={mentor.notes ? `Notas: ${mentor.notes}` : ""}
                    />
                  </Link>
                </List.Item>
              )}
            />
          </>
        ) : (
          <>
            <Row style={{ display: "flex", justifyContent: "space-between" }}>
              <Title level={2}>Mentores indisponíveis</Title>
              <Button
                type="primary"
                style={{ float: "right" }}
                onClick={(_) => setAvailable(!available)}
              >
                Mentores disponíveis
              </Button>
            </Row>
            <List
              itemLayout="vertical"
              dataSource={unavailableMentors}
              renderItem={(mentor: any) => (
                <List.Item style={{ cursor: "pointer" }}>
                  <Link href={`/profile/mentor/${mentor.id}`}>
                    <List.Item.Meta
                      avatar={<Avatar size={64} src={mentor.photo} />}
                      title={`${mentor.first_name} ${mentor.last_name}`}
                      description={mentor.notes ? `Notas: ${mentor.notes}` : ""}
                    />
                  </Link>
                </List.Item>
              )}
            />
          </>
        )}
      </>
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
