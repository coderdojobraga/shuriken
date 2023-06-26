import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  Descriptions,
  Grid,
  Modal,
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
  EditOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  PlusOutlined,
  SaveOutlined,
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
  summary: string;
  notes: string;
};

type Location = {
  address: string;
  id: string;
  name: string;
};

function precences() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState(String);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [selectedLectures, setSelectedLectures] = useState<Lecture[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location>(Object);
  const labelStyle = { color: "rgba(0, 0, 0, 0.45)" };
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  //   useEffect(() => {
  //     api
  //       .listEvents()
  //       .then((response: any) => setEvents(response.data))
  //       .catch(() => {});
  //   }, []);

  //   useEffect(() => {
  //     api
  //       .listLectures()
  //       .then((response: any) => setLectures(response.data))
  //       .catch(() => {});
  //   }, []);

  //   useEffect(() => {
  //     api
  //       .getLocations()
  //       .then((response: any) => setLocations(response.data))
  //       .catch(() => {});
  //   }, []);

  //   useEffect(() => {
  //     if (selectedEvent != "") {
  //       setSelectedLectures(
  //         lectures.filter((lecture) => lecture.event.id === selectedEvent)
  //       );
  //     }
  //   }, [selectedEvent, lectures]);

  //   useEffect(() => {
  //     if (selectedLectures.length > 0) {
  //       const location = locations.find(
  //         (location) => location.id === selectedLectures[0].event.location_id
  //       );
  //       setSelectedLocation(location);
  //     }
  //   }, [selectedLectures, locations]);

  //   const deleteLecture = (lecture: Lecture) => {
  //     api
  //       .deleteLecture(lecture.id)
  //       .then(() => {
  //         setSelectedLectures(
  //           selectedLectures.filter((l) => l.id !== lecture.id)
  //         );
  //       })
  //       .catch(() => {});
  //   };

  //   const [open, setOpen] = useState(false);
  //   const showModal = () => {
  //     setOpen(true);
  //   };

  //   const handleOk = () => {
  //     setTimeout(() => {
  //       setOpen(false);
  //     }, 1);
  //   };

  const [editButtonVisible, setEditButtonVisible] = useState(true);
  const [saveButtonVisible, setSaveButtonVisible] = useState(false);
  const [cancelButtonVisible, setCancelButtonVisible] = useState(false);

  const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  const handleEditButtonClick = () => {
    setEditButtonVisible(false);
    setSaveButtonVisible(true);
    setCancelButtonVisible(true);
  };

  const handleSaveButtonClick = () => {
    // Perform the save operation

    setSaveButtonVisible(false);
    setCancelButtonVisible(false);
    setEditButtonVisible(true);
  };

  const handleCancelButtonClick = () => {
    setSaveButtonVisible(false);
    setCancelButtonVisible(false);
    setEditButtonVisible(true);
  };

  return (
    <>
      <Row justify="space-between">
        <Title level={2}>Presenças</Title>
        <Space>
          {editButtonVisible && (
            <Link href="/admin/lectures/precences">
              <Button
                shape="circle"
                type="primary"
                size="large"
                icon={<EditOutlined />}
                onClick={handleEditButtonClick}
              />
            </Link>
          )}
          {saveButtonVisible && (
            <Button
              shape="circle"
              type="primary"
              size="large"
              icon={<SaveOutlined />}
              onClick={handleSaveButtonClick}
            />
          )}
          {cancelButtonVisible && (
            <Button
              danger
              shape="circle"
              type="primary"
              size="large"
              icon={<CloseOutlined />}
              onClick={handleCancelButtonClick}
            />
          )}
        </Space>
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
    </>
  );
}

export default withAuth(precences);
