import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "@coderdojobraga/ui";
import { withAuth } from "~/components/Auth";
import {
  Avatar,
  Button,
  Checkbox,
  Col,
  Divider,
  Input,
  List,
  Popconfirm,
  Row,
  Select,
  Typography,
} from "antd";
import { useEvent } from "~/hooks/events";
import AppLayout from "~/layouts/AppLayout";
import Event from "~/components/Event";
import Belt from "~/components/Belt";
import { notifyError, notifyInfo } from "~/components/Notification";
import {
  EUser,
  createAvailability,
  createEnrollment,
  getAvailabilities,
  getAvailableMentors,
  getEnrolledNinjas,
  getNinjas,
  updateAvailability,
} from "bokkenjs";

const { Title } = Typography;

function EventPage() {
  const { user } = useAuth();
  const role = user?.role;

  const router = useRouter();
  const { id: event_id } = router.query;

  const { data: event, isLoading } = useEvent(event_id as string);

  const [availabilities, setAvailabilities] = useState([]);
  const [mentors, setMentors] = useState<any[]>([]);
  const [availableMentors, setAvailableMentors] = useState([]);
  const [availability, setAvailability] = useState(false);
  const [notes, setNotes] = useState("");
  const [changeAvailability, setChangeAvailability] = useState(false);

  const [ninjas, setNinjas] = useState([]);
  const [selectedNinjas, setSelectedNinjas] = useState([]);
  const [enrolledNinjas, setEnrolledNinjas] = useState([]);

  useEffect(() => {
    if (role === EUser.Mentor) {
      getAvailableMentors(event_id as string)
        .then((response: any) => {
          setMentors(response.data);
          setAvailableMentors(
            response.data.filter((mentor: any) => mentor.is_available)
          );
        })
        .catch((error) => {
          notifyError(
            "Ocorreu um erro",
            "Não foi possível obter os mentores disponíveis"
          );
        });
    }
  }, [event_id, role]);

  useEffect(() => {
    if (role === EUser.Mentor) {
      getAvailabilities(event_id as string)
        .then((response: any) => setAvailabilities(response.data))
        .catch((error) => {
          notifyError(
            "Ocorreu um erro",
            "Não foi possível obter os mentores disponíveis"
          );
        });
    }
  }, [event_id, role]);

  useEffect(() => {
    if (role === EUser.Guardian) {
      getEnrolledNinjas(event_id as string)
        .then((response: any) =>
          setEnrolledNinjas(
            response.data.filter(
              (entity: any) => entity?.ninja.guardian_id === user?.guardian_id!
            )
          )
        )
        .catch((error) => {
          notifyError(
            "Ocorreu um erro",
            "Não foi possível obter os ninjas inscritos"
          );
        });
    }
  }, [event_id, role, user?.guardian_id]);

  useEffect(() => {
    if (role === EUser.Guardian) {
      getNinjas()
        .then((response) => setNinjas(response.data))
        .catch((error) => {
          notifyError(
            "Ocorreu um erro",
            "Não foi possível obter os seus ninjas"
          );
        });
    }
  }, [role]);

  const intersectNinjaData = () => {
    const enrolledNinjasIDs = enrolledNinjas.map(
      (entity: any) => entity?.ninja.id
    );

    return ninjas.map((ninja: any) => {
      enrolledNinjasIDs.map((id: any) => {
        if (ninja.id === id) {
          setNinjas((state) =>
            state.filter((element: any) => element.id != ninja.id)
          );
        }
      });
    });
  };

  const registerNinjasOnEvent = () => {
    selectedNinjas.map((ninja: any) => {
      const parsedNinja = JSON.parse(ninja);
      createEnrollment(parsedNinja.id, event_id as string, false)
        .then(() =>
          notifyInfo(
            "Info",
            `O Ninja ${parsedNinja.first_name} ${parsedNinja.last_name} foi inscrito com sucesso`
          )
        )
        .then(() => router.push("/events"))
        .catch((error) => {
          notifyError("Ocorreu um erro", "Não foi possível registar o ninja");
        });
    });
  };

  const isMentorAlreadyRegistered = () => {
    let flag = false;

    if (role === EUser.Mentor) {
      const mentor_id = user?.mentor_id!;

      mentors.map((mentor: any) => {
        if (mentor.id === mentor_id) {
          flag = true;
        }
      });
    }

    return flag;
  };

  const registerMentorOnEvent = () => {
    createAvailability(
      user?.mentor_id!,
      event_id as string,
      availability,
      notes
    )
      .then(() =>
        notifyInfo(
          "Info",
          `A tua inscrição foi recebida com sucesso - ${
            availability ? "disponível" : "não disponível"
          }`
        )
      )
      .then(() => router.push("/events"))
      .catch((error) => {
        notifyError(
          "Ocorreu um erro",
          "Não foi possível inscrever-te na sessão"
        );
      });
  };

  const changeMentorAvailability = () => {
    availabilities.map((element: any) => {
      if (element.id === user?.mentor_id) {
        updateAvailability(
          element.availability_id,
          user?.mentor_id!,
          event_id as string,
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
          .catch((error) => {
            notifyError(
              "Ocorreu um erro",
              "Não foi possível atualizar a tua inscrição"
            );
          });
      }
    });
  };

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
      <Col>
        {role === EUser.Mentor ? (
          !isMentorAlreadyRegistered() || changeAvailability ? (
            <>
              <Row style={{ marginBottom: "8px", marginTop: "8px" }}>
                <Checkbox onChange={(e) => setAvailability(e.target.checked)}>
                  Estás disponível?
                </Checkbox>
              </Row>
              <Row>
                <Input.TextArea
                  placeholder="Alguma nota sobre a tua disponibilidade? Escreve-a aqui"
                  style={{ width: "50%" }}
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
            <Row style={{ marginBottom: "8px", marginTop: "8px" }}>
              {intersectNinjaData() && (
                <Select
                  placeholder="Escolha pelo menos um Ninja"
                  style={{ width: "50%" }}
                  mode="multiple"
                  onChange={setSelectedNinjas}
                  value={
                    Object.keys(selectedNinjas).length === 0
                      ? undefined
                      : selectedNinjas
                  }
                >
                  {ninjas.map((ninja: any) => (
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
        {role === EUser.Mentor ? (
          isMentorAlreadyRegistered() && !changeAvailability ? (
            <Popconfirm
              title="Tens a certeza que queres atualizar a tua disponibilidade?"
              cancelText="Não"
              okText="Sim"
              onConfirm={(_) => setChangeAvailability(!changeAvailability)}
            >
              <Button
                type="primary"
                style={{ marginBottom: "8px", marginTop: "8px" }}
              >
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
              <Button
                type="primary"
                style={{ marginBottom: "8px", marginTop: "8px" }}
              >
                Confirmar inscrição
              </Button>
            </Popconfirm>
          ) : (
            <Button
              type="primary"
              style={{ marginBottom: "8px", marginTop: "8px" }}
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
            style={{ marginBottom: "8px", marginTop: "8px" }}
            onClick={(_) => registerNinjasOnEvent()}
            disabled={Object.keys(selectedNinjas).length === 0}
          >
            Confirmar inscrição
          </Button>
        )}
        <Divider />
        {role === EUser.Mentor ? (
          <>
            <Title level={2}>Mentores disponíveis</Title>
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
          </>
        )}
      </Col>
    </AppLayout>
  );
}

export default withAuth(EventPage);
