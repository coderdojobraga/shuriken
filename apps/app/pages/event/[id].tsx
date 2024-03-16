import Link from "next/link";
import {
  Alert,
  Avatar,
  Button,
  Col,
  Divider,
  Input,
  List,
  Popconfirm,
  Row,
  Select,
  Typography,
} from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "@coderdojobraga/ui";
import { withAuth } from "~/components/Auth";
import { useEvent } from "~/hooks/events";
import AppLayout from "~/layouts/AppLayout";
import Event from "~/components/Event";
import Belt from "~/components/Belt";
import Availability from "~/components/Availability";
import { notifyError, notifyInfo } from "~/components/Notification";
import {
  EUser,
  createAvailability,
  createEnrollment,
  getEnrolledNinjas,
  getMentorsAvailabilities,
  getNinjas,
  updateAvailability,
} from "bokkenjs";

import styles from "./style.module.css";

const { Title } = Typography;

function EventPage() {
  const { user } = useAuth();
  const role = user?.role;

  const router = useRouter();
  const { id: event_id } = router.query;

  const { data: event, isLoading } = useEvent(event_id as string);

  const [notes, setNotes] = useState("");
  const [changeAvailability, setChangeAvailability] = useState(false);

  const [ninjas, setNinjas] = useState([]);
  const [selectedNinjas, setSelectedNinjas] = useState([]);
  const [enrolledNinjas, setEnrolledNinjas] = useState([]);

  const [availableMentors, setAvailableMentors] = useState([]);
  const [unavailableMentors, setUnavailableMentors] = useState([]);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    if (role === EUser.Mentor) {
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
        .catch((_error) => {
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
        .catch((_error) => {
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
        .catch((_error) => {
          notifyError("Ocorreu um erro", "Não foi possível registar o ninja");
        });
    });
  };

  const isMentorAlreadyRegistered = () => {
    let flag = false;

    const mentor_id = user?.mentor_id!;
    let mentors = availableMentors.concat(unavailableMentors);

    mentors.map((mentor: any) => {
      if (mentor.id === mentor_id) {
        flag = true;
      }
    });

    return flag;
  };

  const registerMentorOnEvent = (is_available: boolean) => {
    createAvailability(
      user?.mentor_id!,
      event_id as string,
      is_available,
      notes
    )
      .then(() =>
        notifyInfo(
          "Info",
          `A tua inscrição foi recebida com sucesso - ${
            is_available ? "disponível" : "não disponível"
          }`
        )
      )
      .then(() => router.push("/events"))
      .catch((_error) => {
        notifyError(
          "Ocorreu um erro",
          "Não foi possível inscrever-te na sessão"
        );
      });
  };

  const changeMentorAvailability = (is_available: boolean) => {
    let mentors = availableMentors.concat(unavailableMentors);

    mentors.map((element: any) => {
      if (element.id === user?.mentor_id) {
        updateAvailability(
          element.availability_id,
          user?.mentor_id!,
          event_id as string,
          is_available,
          notes
        )
          .then(() =>
            notifyInfo(
              "Info",
              `A tua inscrição foi atualizada com sucesso - ${
                is_available ? "disponível" : "não disponível"
              }`
            )
          )
          .then(() => router.push("/events"))
          .catch((_error) => {
            notifyError(
              "Ocorreu um erro",
              "Não foi possível atualizar a tua inscrição"
            );
          });
      }
    });
  };

  const registerOrUpdateAvailability = (value: boolean) => {
    if (isMentorAlreadyRegistered()) {
      changeMentorAvailability(value);
    } else {
      registerMentorOnEvent(value);
    }
  };
  return (
    <AppLayout>
      <Alert
        message="O número total de vagas para a sessão do dia 23 de março foi atingida."
        type="warning"
        showIcon
        closable
        style={{ marginBottom: "1rem" }}
      />
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
              <Row>
                <Input.TextArea
                  placeholder="Alguma nota sobre a tua disponibilidade? Escreve-a aqui. Atenção a tua nota será visível para todos os mentores."
                  style={{ width: "50%" }}
                  rows={6}
                  autoSize={{ minRows: 6, maxRows: 18 }}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Row>
              <Row style={{ marginBottom: "8px", marginTop: "8px" }}>
                <Button
                  type="primary"
                  onClick={(_) => registerOrUpdateAvailability(true)}
                >
                  Estou disponível
                </Button>
                <Button
                  type="default"
                  danger
                  onClick={(_) => registerOrUpdateAvailability(false)}
                  className={styles.dangerButton}
                >
                  Não estou disponível
                </Button>
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
          ) : (
            <></>
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
        ) : (
          <>
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
          </>
        )}
      </Col>
    </AppLayout>
  );
}

export default withAuth(EventPage);
