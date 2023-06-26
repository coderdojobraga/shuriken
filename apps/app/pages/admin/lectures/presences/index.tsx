import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import {
  CloseOutlined,
  EditOutlined,
  SaveOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import {
  getNinjaEvents,
  listEvents,
  listLectures,
  listMentors,
} from "bokkenjs";
import * as api from "bokkenjs";
import { notifyError, notifyInfo } from "~/components/Notification";
import AppLayout from "~/layouts/AppLayout";
import { set } from "lodash-es";
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

export default function Presences() {
  const [editButtonVisible, setEditButtonVisible] = useState(true);
  const [saveButtonVisible, setSaveButtonVisible] = useState(false);
  const [cancelButtonVisible, setCancelButtonVisible] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [originalData, setOriginalData] = useState<any[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [selectedLectures, setSelectedLectures] = useState<Lecture[]>([]);
  const [locations, setLocations] = useState<any[]>([]);

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
    if (selectedEvent !== "") {
      setSelectedLectures(
        lectures.filter((lecture) => lecture.event.id === selectedEvent)
      );
    }
  }, [selectedEvent, lectures]);

  useEffect(() => {
    generateData();
  }, [selectedLectures]);

  const generateData = () => {
    const data: any[] = [];

    selectedLectures.forEach((lecture) => {
      data.push({
        ninja: `${lecture.ninja.first_name} ${lecture.ninja.last_name}`,
        mentor: `${lecture.mentor.first_name} ${lecture.mentor.last_name}`,
        presences: "Nenhum",
        key: lecture.id,
      });
    });

    setData(data);
  };

  const handleEditButtonClick = () => {
    setEditButtonVisible(false);
    setSaveButtonVisible(true);
    setCancelButtonVisible(true);
  };

  const handleSaveButtonClick = () => {
    setOriginalData([...data]);
    setSaveButtonVisible(false);
    setCancelButtonVisible(false);
    setEditButtonVisible(true);
  };

  const handleCancelButtonClick = () => {
    setSaveButtonVisible(false);
    setCancelButtonVisible(false);
    setEditButtonVisible(true);
  };

  const handleComboBoxChange = (key: string) => (value: string) => {
    const updatedData = [...data];
    const dataIndex = updatedData.findIndex((item) => item.key === key);
    if (dataIndex > -1) {
      updatedData[dataIndex].presences = value;
      setData(updatedData);
    }
  };

  const columns = [
    {
      title: "Ninja",
      dataIndex: "ninja",
      width: "33%",
    },
    {
      title: "Mentor",
      dataIndex: "mentor",
      width: "33%",
    },
    {
      title: "Presenças",
      dataIndex: "presences",
      width: "33%",
      render: (_: any, record: any) => {
        if (editButtonVisible) {
          return <span>{record.presences}</span>; // Render static text when not in edit mode
        } else {
          return (
            <Select
              value={record.presences}
              onChange={handleComboBoxChange(record.key)}
              style={{ width: 160 }}
            >
              <Select.Option value="Nenhum">Nenhum</Select.Option>
              <Select.Option value="Ninja Faltou">Ninja Faltou</Select.Option>
              <Select.Option value="Mentor Faltou">Mentor Faltou</Select.Option>
              <Select.Option value="Presentes">Presentes</Select.Option>
            </Select>
          );
        }
      },
    },
  ];

  return (
    <>
      <AppLayout>
        <Row justify="space-between">
          <Title level={2}>Presenças</Title>
          <Space>
            {editButtonVisible && (
              <Button
                shape="circle"
                type="primary"
                size="large"
                icon={<EditOutlined />}
                onClick={handleEditButtonClick}
                disabled={!editButtonVisible}
              />
            )}
            {saveButtonVisible && (
              <Button
                shape="circle"
                type="primary"
                size="large"
                icon={<SaveOutlined />}
                onClick={handleSaveButtonClick}
                disabled={!saveButtonVisible}
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
                disabled={!cancelButtonVisible}
              />
            )}
          </Space>
        </Row>
        <Row justify="space-around" gutter={[50, 50]}>
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
        <div style={{ marginBottom: 25 }} />
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 40,
          }}
          scroll={{
            y: 490,
          }}
        />
      </AppLayout>
    </>
  );
}
