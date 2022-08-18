import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuth, withAuth } from "~/components/Auth";
import * as USER from "~/lib/user";
import {
  Avatar,
  Col,
  notification,
  Row,
  Typography,
  Button,
  List,
  Checkbox,
  Select,
  Input,
} from "antd";
import AppLayout from "~/components/layouts/AppLayout";
import LinkTo from "~/components/utils/LinkTo";
import EventInfo from "~/components/Event/EventInfo";
import {
  getEventByID,
  getAvailableMentors,
  createAvailability,
  createEnrollment,
  getNinjas,
} from "~/lib/api";

const { Title } = Typography;

function Event() {
  const { user } = useAuth();
  const role = user.role;

  const router = useRouter();
  const { id } = router.query;

  const [event, setEvent] = useState({});
  const [mentors, setMentors] = useState([]);

  const [ninjas, setNinjas] = useState([]);
  const [selectedNinjas, setSelectedNinjas] = useState([]);

  const [isAvailable, setAvailability] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (id) {
      getEventByID(id)
        .then((response) => setEvent(response.data))
        .catch((error) => notification["error"](error.data?.errors));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getAvailableMentors(id)
        .then((response) => setMentors(response))
        .catch((error) => notification["error"](error.data?.errors));
    }
  }, [id]);

  useEffect(() => {
    if (role == USER.ROLES.GUARDIAN) {
      getNinjas()
        .then((response) => setNinjas(response.data))
        .catch((error) => notification["error"](error.data?.errors));
    }
  }, []);

  const registerNinjasOnEvent = () => {
    selectedNinjas.map((ninja) =>
      createEnrollment(ninja, id, false).catch((error) =>
        notification["error"](error.data?.errors)
      )
    );
  };

  const registerMentorOnEvent = () => {
    createAvailability(user.mentor_id, id, isAvailable, notes).catch((error) =>
      notification["error"](error.data?.errors)
    );
  };

  const eventTitle =
    event?.title ||
    `Sessão ${new Date(event?.start_time).toLocaleDateString("pt", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    })}`;

  return (
    <AppLayout>
      <Row justify="start">
        <Col {...{ xs: 24, md: 12, xl: 8, xxl: 8 }}>
          <Title level={2}>{eventTitle}</Title>
          <EventInfo
            {...event}
            breakpoints={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }}
          />
          <Row justify="start" className="mt-4 mb-2">
            {role == USER.ROLES.MENTOR ? (
              <>
                <Checkbox onChange={(e) => setAvailability(e.target.checked)}>
                  Estás disponível?
                </Checkbox>
                <Input.TextArea
                  rows={6}
                  autoSize={{ minRows: 6, maxRows: 18 }}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Alguma nota sobre a tua disponibilidade? Escreve-a aqui."
                  className="mt-4 w-3/4"
                />
              </>
            ) : (
              <Select
                mode="multiple"
                className="w-3/4"
                placeholder="Escolha pelo menos um Ninja"
                onChange={setSelectedNinjas}
                value={selectedNinjas}
              >
                {ninjas.map((ninja) => (
                  <Select.Option key={ninja.id} value={ninja.id}>
                    <div className="inline m-auto">
                      <Avatar size={24} src={ninja.photo} />
                      {`${ninja.first_name} ${ninja.last_name}`}
                    </div>
                  </Select.Option>
                ))}
              </Select>
            )}
          </Row>
          {role == USER.ROLES.MENTOR ? (
            <Button
              type="primary"
              className="mt-2 mb-4"
              onClick={(_) => registerMentorOnEvent()}
            >
              Confirmar inscrição
            </Button>
          ) : (
            <Button
              type="primary"
              className="mt-2 mb-4"
              onClick={(_) => registerNinjasOnEvent()}
            >
              Confirmar inscrição
            </Button>
          )}
        </Col>
        <Col {...{ xs: 24, md: 12, xl: 16, xxl: 16 }}>
          <Title level={2} className="md:text-center">
            Mentores disponíveis
          </Title>
          <List
            itemLayout="vertical"
            dataSource={mentors}
            renderItem={(mentor) => (
              <List.Item>
                <LinkTo href={`/profile/mentor/${mentor.id}`}>
                  <List.Item.Meta
                    avatar={<Avatar size={64} src={mentor.photo} />}
                    title={`${mentor.first_name} ${mentor.last_name}`}
                    description={mentor.notes ? `Notas: ${mentor.notes}` : ""}
                  />
                </LinkTo>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </AppLayout>
  );
}

export default withAuth(Event);
