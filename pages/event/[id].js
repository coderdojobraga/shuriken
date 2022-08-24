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
  Divider,
  Popconfirm,
} from "antd";
import { useEvent } from "~/hooks/events";
import AppLayout from "~/components/layouts/AppLayout";
import LinkTo from "~/components/utils/LinkTo";
import Event from "~/components/Event";
import Belt from "~/components/Belt";
import { notifyInfo } from "~/components/InfoNotification";
import {
  getAvailabilities,
  getAvailableMentors,
  createAvailability,
  updateAvailability,
  createEnrollment,
  getNinjas,
  getEnrolledNinjas,
} from "~/lib/api";

const { Title } = Typography;

function EventPage() {
  const { user } = useAuth();
  const role = user.role;

  const router = useRouter();
  const { id: event_id } = router.query;

  const { data: event, isLoading } = useEvent(event_id);

  const [availabilities, setAvailabilities] = useState([]);
  const [availableMentors, setAvailableMentors] = useState([]);
  const [availability, setAvailability] = useState(false);
  const [notes, setNotes] = useState("");
  const [changeAvailability, setChangeAvailability] = useState(false);

  const [ninjas, setNinjas] = useState([]);
  const [selectedNinjas, setSelectedNinjas] = useState({});
  const [enrolledNinjas, setEnrolledNinjas] = useState([]);

  useEffect(() => {
    if (role === USER.ROLES.MENTOR) {
      getAvailableMentors(event_id)
        .then((response) => setAvailableMentors(response))
        .catch((error) => notification["error"](error.data?.errors));
    }
  }, [event_id]);

  useEffect(() => {
    if (role === USER.ROLES.MENTOR) {
      getAvailabilities(event_id)
        .then((response) => setAvailabilities(response.data))
        .catch((error) => notification["error"](error.data?.errors));
    }
  }, [event_id]);

  useEffect(() => {
    if (role === USER.ROLES.GUARDIAN) {
      getEnrolledNinjas(event_id, user.guardian_id)
        .then((response) => setEnrolledNinjas(response))
        .catch((error) => notification["error"](error.data?.errors));
    }
  }, [event_id]);

  useEffect(() => {
    if (role === USER.ROLES.GUARDIAN) {
      getNinjas()
        .then((response) => setNinjas(response.data))
        .catch((error) => notification["error"](error.data?.errors));
    }
  }, []);

  const intersectNinjaData = () => {
    const enrolledNinjasIDs = enrolledNinjas.map((entity) => entity?.ninja.id);

    ninjas.map((ninja) => {
      enrolledNinjasIDs.map((id) => {
        if (ninja.id === id) {
          setNinjas((state) =>
            state.filter((element) => element.id != ninja.id)
          );
        }
      });
    });
  };

  const registerNinjasOnEvent = () => {
    selectedNinjas.map((ninja) => {
      const parsedNinja = JSON.parse(ninja);
      createEnrollment(parsedNinja.id, event_id, false)
        .then(() =>
          notifyInfo(
            "Info",
            `O Ninja ${parsedNinja.first_name} ${parsedNinja.last_name} foi inscrito com sucesso`
          )
        )
        .then(() => router.push("/events"))
        .catch((error) => notification["error"](error.data?.errors));
    });
  };

  const isMentorAlreadyRegistered = () => {
    const flag = false;

    if (role === USER.ROLES.MENTOR) {
      const mentor_id = user.mentor_id;

      availableMentors.map((mentor) => {
        if (mentor.id === mentor_id) {
          flag = true;
        }
      });
    }

    return flag;
  };

  const registerMentorOnEvent = () => {
    createAvailability(user.mentor_id, event_id, availability, notes)
      .then(() =>
        notifyInfo(
          "Info",
          `A tua inscrição foi recebida com sucesso - ${
            availability ? "disponível" : "não disponível"
          }`
        )
      )
      .then(() => router.push("/events"))
      .catch((error) => notification["error"](error.data?.errors));
  };

  const changeMentorAvailability = () => {
    availabilities.map((element) => {
      if (element.id === user.mentor_id) {
        updateAvailability(
          element.availability_id,
          user.mentor_id,
          event_id,
          availability,
          notes
        )
          .then(() =>
            notifyInfo(
              "Info",
              `A tua inscrição foi atualizada com sucesso - ${
                availability ? "disponível" : "não disponível"
              }`
            )
          )
          .then(() => router.push("/events"))
          .catch((error) => notification["error"](error.data?.errors));
      }
    });
  };

  return (
    <AppLayout>
      <Title level={2}>Detalhes do evento</Title>
      <Row className="mb-2" align="top" justify="space-between">
        <Event
          event={event}
          collapsed={false}
          details={true}
          isLoading={isLoading}
        />
      </Row>
      <Col>
        {role === USER.ROLES.MENTOR ? (
          !isMentorAlreadyRegistered() || changeAvailability ? (
            <>
              <Row className="mt-2 mb-2">
                <Checkbox onChange={(e) => setAvailability(e.target.checked)}>
                  Estás disponível?
                </Checkbox>
              </Row>
              <Row>
                <Input.TextArea
                  placeholder="Alguma nota sobre a tua disponibilidade? Escreve-a aqui"
                  className="w-1/2"
                  rows={6}
                  autoSize={{ minRows: 6, maxRows: 18 }}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Row>
            </>
          ) : (
            <></>
          )
        ) : (
          <>
            <Row className="mt-2 mb-2">
              {intersectNinjaData() || (
                <Select
                  placeholder="Escolha pelo menos um Ninja"
                  className="w-1/2"
                  mode="multiple"
                  onChange={setSelectedNinjas}
                  value={
                    Object.keys(selectedNinjas).length === 0
                      ? undefined
                      : selectedNinjas
                  }
                >
                  {ninjas.map((ninja) => (
                    <Select.Option key={ninja.id} value={JSON.stringify(ninja)}>
                      <div>
                        <Avatar size={24} src={ninja.photo} />
                        {`${ninja.first_name} ${ninja.last_name}  `}
                        {<Belt belt={ninja.belt} />}
                      </div>
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Row>
          </>
        )}
        {role === USER.ROLES.MENTOR ? (
          isMentorAlreadyRegistered() && !changeAvailability ? (
            <Popconfirm
              title="Tens a certeza que queres atualizar a tua disponibilidade?"
              cancelText="Não"
              okText="Sim"
              onConfirm={(_) => setChangeAvailability(!changeAvailability)}
            >
              <Button type="primary" className="mt-2 mb-2">
                Alterar inscrição
              </Button>
            </Popconfirm>
          ) : !availability ? (
            <Popconfirm
              title="Tens a certeza que não estás disponível?"
              cancelText="Não"
              okText="Sim"
              onConfirm={
                !changeAvailability
                  ? (_) => registerMentorOnEvent()
                  : (_) => changeMentorAvailability()
              }
            >
              <Button type="primary" className="mt-2 mb-2">
                Confirmar inscrição
              </Button>
            </Popconfirm>
          ) : (
            <Button
              type="primary"
              className="mt-2 mb-2"
              onClick={
                !changeAvailability
                  ? (_) => registerMentorOnEvent()
                  : (_) => changeMentorAvailability()
              }
            >
              Confirmar inscrição
            </Button>
          )
        ) : (
          <Button
            type="primary"
            className="mt-2 mb-2"
            onClick={(_) => registerNinjasOnEvent()}
            disabled={Object.keys(selectedNinjas).length === 0}
          >
            Confirmar inscrição
          </Button>
        )}
        <Divider />
        {role === USER.ROLES.MENTOR ? (
          <>
            <Title level={2}>Mentores disponíveis</Title>
            <List
              itemLayout="vertical"
              dataSource={availableMentors}
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
          </>
        ) : (
          <>
            <Title level={2}>Ninjas inscritos</Title>
            <List
              itemLayout="vertical"
              dataSource={enrolledNinjas}
              renderItem={({ ninja }) => (
                <List.Item>
                  <LinkTo href={`/profile/ninja/${ninja.id}`}>
                    <List.Item.Meta
                      avatar={<Avatar size={64} src={ninja.photo} />}
                      title={`${ninja.first_name} ${ninja.last_name}`}
                      description={<Belt belt={ninja.belt} />}
                    />
                  </LinkTo>
                </List.Item>
              )}
            />
          </>
        )}
      </Col>
    </AppLayout>
  );
}

export default withAuth(EventPage);
