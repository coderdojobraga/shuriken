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
  const [data, setData] = useState(generateData());
  const [originalData, setOriginalData] = useState(generateData());
  const [modifiedData, setModifiedData] = useState(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState(String);
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
    if (selectedEvent != "") {
      setSelectedLectures(
        lectures.filter((lecture) => lecture.event.id === selectedEvent)
      );
    }
  }, [selectedEvent, lectures]);

  function generateData() {
    const newData = [];
    for (let i = 0; i < 100; i++) {
      newData.push({
        key: i,
        ninja: `ninja ${i}`,
        mentor: `mentor do ninja ${i}`,
        presences: false, // Initialize with false
      });
    }
    return newData;
  }

  const handleEditButtonClick = () => {
    setEditButtonVisible(false);
    setSaveButtonVisible(true);
    setCancelButtonVisible(true);
  };

  const handleSaveButtonClick = () => {
    setOriginalData([...data]); 
    setModifiedData( [...data]);
    setSaveButtonVisible(false);
    setCancelButtonVisible(false);
    setEditButtonVisible(true);
  };

  const handleCancelButtonClick = () => {
    if (modifiedData) {
      setData(originalData); // Revert data to the original state
      setModifiedData(null);
    }
    setSaveButtonVisible(false);
    setCancelButtonVisible(false);
    setEditButtonVisible(true);
  };

  const handleComboBoxChange = (key:any) => (value:any) => {
    const updatedData = [...data];
    const dataIndex = updatedData.findIndex((item) => item.key === key);
    if (dataIndex > -1) {
      updatedData[dataIndex].presences = value;
      
      setData(updatedData);
      setModifiedData(updatedData); // Update modifiedData with the updated data
    }
  };

  const columns = [
    {
      title: "Ninja",
      dataIndex: "ninja",
      //width: 208,
      width: "33%",
    },
    {
      title: "Mentor",
      dataIndex: "mentor",
      //width: 208,
      width: "33%",
    },
    {
      title: "Presenças",
      dataIndex: "presences",
      //width: 208,
      width: "33%",
      render: (_:any, record:any) => {
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
              <Select.Option value="Ninja Faltou">Ninja faltou</Select.Option>
              <Select.Option value="Mentor Faltou">Mentor faltou</Select.Option>
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
        <div style={{ marginBottom: 25}} />
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 40,
          }}
          scroll={{
            y: 480,
          }}
        />
      </AppLayout>
    </>
  );
}
