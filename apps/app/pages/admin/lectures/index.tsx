import { useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, Button, Col, List, Row, Select, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { withAuth } from "~/components/Auth";
import AppLayout from "~/layouts/AppLayout";
import * as api from "bokkenjs";
import Ninja from "~/components/Ninja";
import { list_events } from "bokkenjs";
const { Title } = Typography;

function Lectures() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [lectures, setLectures] = useState([]);
  const [selectedLectures, setSelectedLectures] = useState([]);

  useEffect(() => {
    api
      .list_events()
      .then((response: any) => setEvents(response.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    api
      .listLectures()
      .then((response: any) => setLectures(response.data))
      .catch(() => {});
  }, []);

  console.log(lectures);

  useEffect(() => {
    if (Object.keys(selectedEvent).length !== 0) {
      setSelectedLectures(
        lectures.filter((lecture) => lecture?.event.id === selectedEvent)
      );
    }
  }, [selectedEvent, lectures]);

  return (
    <AppLayout>
      <Row justify="space-between">
        <Title level={2}>Criar uma Lecture</Title>
        <Link href="/admin/lectures/new">
          <Button
            shape="circle"
            type="primary"
            size="large"
            icon={<PlusOutlined />}
          />
        </Link>
      </Row>
      <Row justify="space-around" gutter={[10, 10]}>
        <Select
          defaultValue="Selecione um Evento"
          style={{ width: 200 }}
          onChange={setSelectedEvent}
          value={
            Object.keys(selectedEvent).length === 0 ? undefined : selectedEvent
          }
        >
          {events.map((event) => (
            <Select.Option value={event.id}>{event.title}</Select.Option>
          ))}
        </Select>
      </Row>
      <h1>{selectedEvent.title}</h1>
      {selectedLectures.map((lecture) => (
        <Col
          style={{
            border: "1px solid gray",
            padding: "16px",
            margin: "16px 0",
          }}
        >
          <List.Item>
            <Title style={{ width: "100px" }} level={4}>
              Mentor
            </Title>
            <Link href={`/profile/mentor/${lecture.mentor.id}`}>
              <List.Item.Meta
                avatar={<Avatar size={64} src={lecture.mentor.photo} />}
                title={`${lecture.mentor.first_name} ${lecture.mentor.last_name}`}
              />
            </Link>
          </List.Item>
          <List.Item>
            <Title style={{ width: "100px" }} level={4}>
              Ninja
            </Title>
            <Link href={`/profile/ninja/${lecture.ninja.id}`}>
              <List.Item.Meta
                avatar={<Avatar size={64} src={lecture.ninja.photo} />}
                title={`${lecture.ninja.first_name} ${lecture.ninja.last_name}`}
              />
            </Link>
          </List.Item>
        </Col>
      ))}
    </AppLayout>
  );
}

export default withAuth(Lectures);
