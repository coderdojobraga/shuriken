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
import styles from "~/styles/Dashboard.module.css";
import moment from "moment";

const { Title } = Typography;

function Dashboard() {
  const { user } = useAuth();
  const role = user?.role;

  const [ninjas, setNinjas] = useState([]);
  const { data: events, isLoading: isLoadingEvents } = useEvents();
  const { data: badges, isLoading: isLoadingBadges } = useBadges();
  const [emails_success, setEmails_success] = useState([]);
  const [emails_fail, setEmails_fail] = useState([]);
  const [visible_signup, setVisible_signup] = useState(false);
  const [visible_selected, setVisible_selected] = useState(false);
  const [confirmed_signup, setConfirmed_signup] = useState(false);
  const [confirmed_selected, setConfirmed_selected] = useState(false);
  const [showInfoA, setShowInfoA] = useState(true);

  const nextEvent = () => {
    const cur = moment();

    const sorted_events = events
      .filter((e: any) => cur.diff(e.start_time) < 0)
      .sort((e1: any, e2: any) => {
        cur.diff(e1.start_time) > cur.diff(e2.start_time);
      });

    return sorted_events[0] != undefined ? sorted_events[0] : false;
  };

  const handleCloseModal_signup = () => {
    setVisible_signup(false);
  };

  const handleCloseModal_selected = () => {
    setVisible_selected(false);
  };

  const notify_signup_ninjas = () => {
    notify_signup()
      .then((response) => {
        setEmails_success(response.success);
        setEmails_fail(response.fail);
        setVisible_signup(true);
        notifyInfo("Enviado com successo!");
      })
      .catch((error) => {
        notifyError("Não foi enviado!");
      });
  };

  const notify_selected_ninjas = () => {
    notify_selected()
      .then((response) => {
        setEmails_success(response.success);
        setEmails_fail(response.fail);
        setVisible_selected(true);
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
                  setConfirmed_signup(true);
                }}
                disabled={confirmed_signup}
              >
                <Modal
                  visible={visible_signup}
                  onCancel={handleCloseModal_signup}
                  centered={true}
                  closable={false}
                  title={
                    <div style={{ textAlign: "center" }}>
                      Relatório de envio de emails
                    </div>
                  }
                  footer={[
                    <Button
                      key="close"
                      type="primary"
                      onClick={handleCloseModal_signup}
                    >
                      Close
                    </Button>,
                  ]}
                >
                  <div className="h-96 p-4">
                    <div className="flex justify-center">
                      <button
                        className={`mr-2 rounded-t-lg px-4 py-2 ${
                          showInfoA
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setShowInfoA(true)}
                      >
                        &nbsp; Entregues &nbsp;
                      </button>
                      <button
                        className={`rounded-t-lg px-4 py-2 ${
                          !showInfoA
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setShowInfoA(false)}
                      >
                        Não entregues
                      </button>
                    </div>

                    <div className="min-h-max rounded-lg border p-4">
                      {showInfoA ? (
                        <>
                          {emails_success.length > 0 ? (
                            <ul
                              style={{
                                height: "275px",
                                overflowY: "scroll",
                                overflowX: "scroll",
                              }}
                            >
                              {emails_success.map((email, index) => (
                                <li
                                  key={index}
                                  style={{
                                    borderTop:
                                      index !== 0
                                        ? "1px solid #e0e0e0"
                                        : "none",
                                    padding: "8px 0",
                                    color: "#555",
                                  }}
                                >
                                  {email}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div
                              style={{
                                height: "275px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <p>Sem emails para mostrar</p>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          {emails_fail.length > 0 ? (
                            <ul
                              style={{
                                height: "275px",
                                overflowY: "scroll",
                                overflowX: "scroll",
                              }}
                            >
                              {emails_fail.map((email, index) => (
                                <li
                                  key={index}
                                  style={{
                                    borderTop:
                                      index !== 0
                                        ? "1px solid #e0e0e0"
                                        : "none",
                                    padding: "8px 0",
                                    color: "#555",
                                  }}
                                >
                                  {email}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div
                              style={{
                                height: "275px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <p>Sem emails para mostrar</p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </Modal>
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
                  setConfirmed_selected(true);
                }}
                disabled={confirmed_selected}
              >
                <Modal
                  visible={visible_selected}
                  onCancel={handleCloseModal_selected}
                  centered={true}
                  closable={false}
                  title={
                    <div style={{ textAlign: "center" }}>
                      Relatório de envio de emails
                    </div>
                  }
                  footer={[
                    <Button
                      key="close"
                      type="primary"
                      onClick={handleCloseModal_selected}
                    >
                      Close
                    </Button>,
                  ]}
                >
                  <div className="h-96 p-4">
                    <div className="flex justify-center">
                      <button
                        className={`mr-2 rounded-t-lg px-4 py-2 ${
                          showInfoA
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setShowInfoA(true)}
                      >
                        &nbsp; Entregues &nbsp;
                      </button>
                      <button
                        className={`rounded-t-lg px-4 py-2 ${
                          !showInfoA
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setShowInfoA(false)}
                      >
                        Não entregues
                      </button>
                    </div>

                    <div className="min-h-max rounded-lg border p-4">
                      {showInfoA ? (
                        <>
                          {emails_success.length > 0 ? (
                            <ul
                              style={{
                                height: "275px",
                                overflowY: "scroll",
                                overflowX: "scroll",
                              }}
                            >
                              {emails_success.map((email, index) => (
                                <li
                                  key={index}
                                  style={{
                                    borderTop:
                                      index !== 0
                                        ? "1px solid #e0e0e0"
                                        : "none",
                                    padding: "8px 0",
                                    color: "#555",
                                  }}
                                >
                                  {email}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div
                              style={{
                                height: "275px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <p>Sem emails para mostrar</p>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          {emails_fail.length > 0 ? (
                            <ul
                              style={{
                                height: "275px",
                                overflowY: "scroll",
                                overflowX: "scroll",
                              }}
                            >
                              {emails_fail.map((email, index) => (
                                <li
                                  key={index}
                                  style={{
                                    borderTop:
                                      index !== 0
                                        ? "1px solid #e0e0e0"
                                        : "none",
                                    padding: "8px 0",
                                    color: "#555",
                                  }}
                                >
                                  {email}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div
                              style={{
                                height: "275px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <p>Sem emails para mostrar</p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </Modal>
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
      <Row className={styles.row} align="top" justify="start" gutter={[16, 16]}>
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
  );
}

export default withAuth(Dashboard);
