import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@coderdojobraga/ui";
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
import {
  getNinjaEvents,
  listGuardians,
  list_events,
  list_mentors,
} from "bokkenjs";
import * as api from "bokkenjs";

const { Title } = Typography;

export default function LectureForm({ id }) {
  const router = useRouter();
  const [form] = Form.useForm();
  const [selectedMentor, setSelectedMentor] = useState({});
  const [selectedAssistant, setSelectedAssistant] = useState([]);
  const [selectedNinja, setSelectedNinja] = useState({});
  const [selectedEvent, setSelectedEvent] = useState({});

  const [mentores, setMentores] = useState([]);
  useEffect(() => {
    list_mentors().then((response) => {
      setMentores(response.data);
    });
  }, []);

  const [eventos, setEvents] = useState([]);
  useEffect(() => {
    list_events().then((response) => {
      setEvents(response.data);
    });
  }, []);

  const [ninjas, setNinjas] = useState([]);
  useEffect(() => {
    eventos.map((evento) => {
      getNinjaEvents(evento.id).then((response) => {
        setNinjas((ninjas) => [...ninjas, ...response.data]);
        setNinjas((ninjas) => {
          return ninjas.filter(
            (ninja, index, self) =>
              index === self.findIndex((t) => t.id === ninja.id)
          );
        });
      });
    });
  }, [eventos]);

  const onFinish = (values) => {
    if (id) {
      api
        .createLecture(id, values)
        .then(() => {
          router.push("/admin/lectures");
        })
        .catch((error) => notification["error"](error.data?.errors));
    } else {
      api
        .createLecture(values)
        .then((response) => {
          router.push("/admin/lectures");
        })
        .catch((error) => notification["error"](error.data?.errors));
    }
  };

  const breakpoints = {
    xs: 24,
    md: 12,
    xl: 8,
    xxl: 6,
  };

  return (
    <>
      <Row justify="space-between">
        <Title level={2}>
          {id && ninjas[0]
            ? ninjas[0].first_name + " " + ninjas[0].last_name
            : "Nova Lecture"}
        </Title>
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
            <Form.Item
              label="Evento"
              name="lecture[event_id]"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Escolha um evento"
                style={{ width: "50%" }}
                onChange={setSelectedEvent}
                value={
                  Object.keys(selectedEvent).length === 0
                    ? undefined
                    : selectedEvent
                }
              >
                {eventos.map((event) => (
                  <Select.Option key={event.id} value={event.id}>
                    <div>
                      {`${event.title} - ${event.start_time} - ${event.end_time}`}
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Ninja"
              name="lecture[ninja_id]"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Escolha pelo menos um Ninja"
                style={{ width: "50%" }}
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
                style={{ width: "50%" }}
                onChange={setSelectedMentor}
                value={
                  Object.keys(selectedMentor).length === 0
                    ? undefined
                    : selectedMentor
                }
              >
                {mentores.map((mentor) => (
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
