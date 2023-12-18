import { useEffect, useState } from "react";
import { Button, Col, Modal, Popconfirm, Row, Typography } from "antd";
import { useAuth } from "@coderdojobraga/ui";
import { withAuth } from "~/components/Auth/withAuth";
import AppLayout from "~/layouts/AppLayout";
import Event from "~/components/Event";
import { useBadges } from "~/hooks/badges";
import { EUser, getNinjas, notify_selected, notify_signup } from "bokkenjs";
import Ninja from "~/components/Ninja";
import { useEvents } from "~/hooks/events";
import { notifyError, notifyInfo } from "~/components/Notification";
import FeedbackModal from "~/components/FeedbackModal";
import styles from "~/styles/Dashboard.module.css";
import moment from "moment";

const { Title } = Typography;

function Dashboard() {
  const { user } = useAuth();
  const role = user?.role;

  const [ninjas, setNinjas] = useState([]);
  const { data: events, isLoading: isLoadingEvents } = useEvents();
  const { data: badges, isLoading: isLoadingBadges } = useBadges();

  const nextEvent = () => {
    const cur = moment();

    const sorted_events = events
      .filter((e: any) => cur.diff(e.start_time) < 0)
      .sort((e1: any, e2: any) => {
        cur.diff(e1.start_time) > cur.diff(e2.start_time);
      });

    return sorted_events[0] != undefined ? sorted_events[0] : false;
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const [tabsInfo, setTabsInfo] = useState([
    { tabTitle: "None", info: "Sem informação" },
  ]);

  const notify_signup_ninjas = () => {
    notify_signup()
      .then((response) => {
        const successInfo = response.success || "Nenhuma informação a apresentar";
        const failInfo = response.fail || "Nenhuma informação a apresentar";

        setTabsInfo((prevTabsInfo) => [
          {
            tabTitle: "Enviados",
            info: successInfo,
          },
          {
            tabTitle: "Não enviados",
            info: failInfo,
          },
        ]);
        notifyInfo("Enviado com successo!");
      })
      .catch((error) => {
        notifyError("Não foi enviado!");
      });
  };

  const notify_selected_ninjas = () => {
    notify_selected()
      .then((response) => {
        const successInfo = response.success || "Nenhuma informação a apresentar";
        const failInfo = response.fail || "Nenhuma informação a apresentar";

        setTabsInfo((prevTabsInfo) => [
          {
            tabTitle: "Enviados",
            info:successInfo,
          },
          {
            tabTitle: "Não enviados",
            info: failInfo,
          },
        ]);
        notifyInfo("Enviado com successo!");
      })
      .catch((error) => {
        notifyError("Não foi enviado!");
      });
  };

  useEffect(() => {
    if (role === EUser.Guardian) {
      getNinjas()
        .then((response: any) => setNinjas(response.data))
        .catch((error) => {
          notifyError(
            "Ocorreu um erro",
            "Não foi possível obter informação sobre os seus ninjas"
          );
        });
    }
  }, [role]);

  return (
    <>
      <AppLayout>
        <Title level={2}>Painel Principal</Title>
        <Row justify="space-between" gutter={8}>
          <Title level={3}>Próximo Evento</Title>
          <Row gutter={[8, 8]}>
            <Col>
              {role === EUser.Organizer ? (
                <Popconfirm
                  title="Tens a certeza que queres notificar?"
                  cancelText="Não"
                  okText="Sim"
                  onConfirm={(_) => {
                    notify_signup_ninjas(); 
                    openModal();
                  }}
                >
                  <Button type="primary">Notificar abertura</Button>
                </Popconfirm>
              ) : (
                <></>
              )}
            </Col>
            <Col>
              {role === EUser.Organizer ? (
                <Popconfirm
                  title="Tens a certeza que queres notificar?"
                  cancelText="Não"
                  okText="Sim"
                  onConfirm={(_) => {
                    notify_selected_ninjas();
                    openModal();
                  }}
                >
                  <Button type="primary">Notificar selecionados</Button>
                </Popconfirm>
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </Row>
        <Row className={styles.row} align="top" justify="space-between">
          {events?.length > 0 && nextEvent() ? (
            <Event
              event={nextEvent()}
              collapsed={false}
              isLoading={isLoadingEvents}
            />
          ) : (
            <Typography>Aguarda que o próximo evento seja divulgado</Typography>
          )}
        </Row>
        <Title level={3}>Eventos</Title>
        <Row
          className={styles.row}
          align="top"
          justify="start"
          gutter={[16, 16]}
        >
          {events?.slice(0, 3).map((event: any) => (
            <Col key={event.id}>
              <Event event={event} isLoading={isLoadingEvents} />
            </Col>
          ))}
        </Row>
        {role === EUser.Guardian ? (
          <>
            <Title level={3}>Ninjas</Title>
            <Row
              className={styles.row}
              align="top"
              justify="start"
              gutter={[16, 16]}
            >
              {ninjas &&
                ninjas.slice(0, 5).map((ninja: any) => (
                  <Col key={ninja.id}>
                    <Ninja {...ninja} />
                  </Col>
                ))}
            </Row>
          </>
        ) : (
          <></>
        )}
      </AppLayout>
      <FeedbackModal visible={modalVisible} onClose={closeModal} tabsInfo={tabsInfo} modalTitle="Relatório de e-mails"/>
    </>
  );
}

export default withAuth(Dashboard);
