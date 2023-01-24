import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  Descriptions,
  Grid,
  Popconfirm,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { withAuth } from "~/components/Auth";
import AppLayout from "~/layouts/AppLayout";
import * as api from "bokkenjs";
import {
  CloseOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  PlusOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

type Event = {
  id: string;
  title: string;
  location_id: string;
};

type Lecture = {
  id: string;
  event: Event;
  mentor: {
    id: string;
    first_name: string;
    last_name: string;
    photo: string;
  };
  ninja: {
    id: string;
    first_name: string;
    last_name: string;
    photo: string;
  };
};

type Location = {
  address: string;
  id: string;
  name: string;
};

function Lectures() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState(String);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [selectedLectures, setSelectedLectures] = useState<Lecture[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location>(Object);
  const labelStyle = { color: "rgba(0, 0, 0, 0.45)" };
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  useEffect(() => {
    api
      .listEvents()
      .then((response: any) => setEvents(response.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    api
      .listLectures()
      .then((response: any) => setLectures(response.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    api
      .getLocations()
      .then((response: any) => setLocations(response.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (selectedEvent != "") {
      setSelectedLectures(
        lectures.filter((lecture) => lecture.event.id === selectedEvent)
      );
    }
  }, [selectedEvent, lectures]);

  useEffect(() => {
    if (selectedLectures.length > 0) {
      const location = locations.find(
        (location) => location.id === selectedLectures[0].event.location_id
      );
      setSelectedLocation(location);
    }
  }, [selectedLectures, locations]);

  // call api to delete lecture
  const deleteLecture = (lecture: Lecture) => {
    api
      .deleteLecture(lecture.id)
      .then(() => {
        setSelectedLectures(
          selectedLectures.filter((l) => l.id !== lecture.id)
        );
      })
      .catch(() => {});
  };
  return (
    <AppLayout>
      <Row justify="space-between">
        <Title level={2}>Sessões</Title>
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
          showSearch
          defaultValue="Selecione um Evento"
          style={{ width: 400 }}
          onChange={setSelectedEvent}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          optionFilterProp="children"
          options={events.map((event) => ({
            label: event.title,
            value: event.id,
          }))}
          value={selectedEvent == "" ? undefined : selectedEvent}
        >
          {events.map((event) => (
            <Select.Option value={event.id}>{event.title}</Select.Option>
          ))}
        </Select>
      </Row>
      <Row>
        {selectedLectures.map((lecture) => (
          <Card
            title={lecture.event?.title}
            style={{ maxWidth: 460, margin: 15 }}
            extra={
              <Popconfirm
                title="Tens a certeza que queres eliminar esta sessão?"
                onConfirm={() => {
                  deleteLecture(lecture);
                }}
                okText="Sim"
                cancelText="Não"
              >
                <Button
                  type="primary"
                  shape="circle"
                  icon={<CloseOutlined />}
                />
              </Popconfirm>
            }
          >
            <Space
              align="end"
              direction="horizontal"
              wrap={(screens.sm && !screens.md) || screens.xs}
            >
              <Descriptions size="small" column={1} layout="horizontal">
                <Descriptions.Item
                  labelStyle={labelStyle}
                  label={
                    <span>
                      <UserAddOutlined /> Ninja
                    </span>
                  }
                  span={1}
                >
                  <Link href={`/profile/ninja/${lecture.ninja?.id}`}>
                    {lecture.ninja?.first_name + " " + lecture.ninja?.last_name}
                  </Link>
                </Descriptions.Item>
                <Descriptions.Item
                  labelStyle={labelStyle}
                  label={
                    <span>
                      <UserOutlined /> Mentor
                    </span>
                  }
                >
                  <Link href={`/profile/mentor/${lecture.mentor?.id}`}>
                    {lecture.mentor?.first_name +
                      " " +
                      lecture.mentor?.last_name}
                  </Link>
                </Descriptions.Item>
                <Descriptions.Item
                  labelStyle={labelStyle}
                  label={
                    <span>
                      <EnvironmentOutlined /> Localização
                    </span>
                  }
                  span={1}
                >
                  {selectedLocation?.address}
                </Descriptions.Item>
              </Descriptions>
            </Space>
          </Card>
        ))}
      </Row>
    </AppLayout>
  );
}

export default withAuth(Lectures);
