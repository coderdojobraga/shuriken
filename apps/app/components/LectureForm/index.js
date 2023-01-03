import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Button,
  Col,
  Form,
  Row,
  Select,
  Space,
  Typography,
  notification,
} from "antd";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { getNinjaEvents, listEvents, listMentors } from "bokkenjs";
import * as api from "bokkenjs";
import { notifyError } from "~/components/Notification";

const { Title } = Typography;

export default function LectureForm({ id }) {
  const router = useRouter();
  const [form] = Form.useForm();
  const [selectedMentor, setSelectedMentor] = useState({});
  const [selectedNinja, setSelectedNinja] = useState({});
  const [selectedEvent, setSelectedEvent] = useState({});

  const [mentors, setMentors] = useState([]);
  useEffect(() => {
    listMentors().then((response) => {
      setMentors(response.data);
    });
  }, []);

  const [events, setEvents] = useState([]);
  useEffect(() => {
    listEvents().then((response) => {
      setEvents(response.data);
    });
  }, []);

  const [ninjas, setNinjas] = useState([]);
  useEffect(() => {
    events.map((event) => {
      getNinjaEvents(event.id).then((response) => {
        setNinjas((ninjas) => [...ninjas, ...response.data]);
        setNinjas((ninjas) => {
          return ninjas.filter(
            (ninja, index, self) =>
              index === self.findIndex((t) => t.id === ninja.id)
          );
        });
      });
    });
  }, [events]);

  useEffect(() => {
    if (id !== "new") {
      listEvents().then((response) => {
        const event = response.data.find((event) => event.id === id);
        setSelectedEvent(event);
      });
    }
  }, [id]);

  const onFinish = (values) => {
    if (Object.keys(selectedEvent).length != 0) {
      api
        .createLecture(values)
        .then(() => {
          router.push("/admin/lectures");
        })
        .catch((error) => {
          notifyError("Ocorreu um erro", "Não foi possível criar uma lecture");
        });
    } else {
      api
        .createLecture(values)
        .then((response) => {
          router.push("/admin/lectures");
        })
        .catch((error) => {
          notifyError("Ocorreu um erro", "Não foi possível criar uma lecture");
        });
    }
  };

  return (
    <>
      <Row justify="space-between">
        <Title level={2}>Nova Sessão</Title>
        <Space>
          <Link href="/admin/lectures">
            <Button
              danger
              shape="circle"
              size="large"
              icon={<CloseOutlined />}
            />
          </Link>
          <Button
            shape="circle"
            type="primary"
            size="large"
            icon={<SaveOutlined />}
            onClick={() => form.submit()}
          />
        </Space>
      </Row>
      <Row align="middle">
        <Col xs={24} sm={24} md={20} lg={16} xl={12}>
          <Form
            {...{
              labelCol: { span: 8 },
              wrapperCol: { span: 16 },
            }}
            form={form}
            onFinish={onFinish}
          >
            {id === "new" ? (
              <Form.Item
                label="Evento"
                name="lecture[event_id]"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder={"Escolha um evento"}
                  style={{ width: "75%" }}
                  onChange={setSelectedEvent}
                  value={
                    Object.keys(selectedEvent).length === 0
                      ? undefined
                      : selectedEvent
                  }
                >
                  {events.map((event) => (
                    <Select.Option key={event.id} value={event.id}>
                      <div>
                        {`${event.title} - ${event.start_time} - ${event.end_time}`}
                      </div>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            ) : (
              <Form.Item
                label="Evento"
                name="lecture[event_id]"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder={"Escolha um evento"}
                  style={{ width: "75%" }}
                  value={selectedEvent}
                >
                  <Select.Option
                    key={selectedEvent.id}
                    value={selectedEvent.id}
                  >
                    <div>
                      {`${selectedEvent.title} - ${selectedEvent.start_time} - ${selectedEvent.end_time}`}
                    </div>
                  </Select.Option>
                </Select>
              </Form.Item>
            )}

            <Form.Item
              label="Ninja"
              name="lecture[ninja_id]"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Escolha pelo menos um Ninja"
                style={{ width: "75%" }}
                onChange={setSelectedNinja}
                value={
                  Object.keys(selectedNinja).length === 0
                    ? undefined
                    : selectedNinja
                }
              >
                {ninjas.map((ninja) => (
                  <Select.Option key={ninja.id} value={ninja.id}>
                    <div>{`${ninja.first_name} ${ninja.last_name}  `}</div>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Mentor"
              name="lecture[mentor_id]"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Escolha pelo menos um Mentor"
                style={{ width: "75%" }}
                onChange={setSelectedMentor}
                value={
                  Object.keys(selectedMentor).length === 0
                    ? undefined
                    : selectedMentor
                }
              >
                {mentors.map((mentor) => (
                  <Select.Option key={mentor.id} value={mentor.id}>
                    <div>{`${mentor.first_name} ${mentor.last_name}  `}</div>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
