import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Row, Select, Space, Table, Typography } from "antd";
import { CloseOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";

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
};

type Lecture = {
  id: string;
  event: Event;
  attendance: string;
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
  const router = useRouter();
  const onFinish = (values: any, lectureId: string) => {
    api
      .updateLecture(lectureId, values)
      .then(() => {
        notifyInfo("Os dados da sessão foram atualizados com sucesso", "");

        // Update the corresponding lecture in lectures state with the new data
        const updatedLectures = lectures.map((lecture) => {
          if (lecture.id === lectureId) {
            return {
              ...lecture,
              attendance: values.attendance,
            };
          }
          return lecture;
        });

        setLectures(updatedLectures);
      })
      .catch((error) => {
        notifyError(
          "Ocorreu um erro",
          "Não foi possível atualizar os dados da sessão"
        );
      });
  };

  useEffect(() => {
    api
      .listEvents()
      .then((response: any) => setEvents(response.data))
      .catch((error) => {
        notifyError(
          "Ocorreu um erro",
          "Não foi possível atualizar os dados da sessão"
        );
      });
  }, []);

  useEffect(() => {
    api
      .listLectures()
      .then((response: any) => setLectures(response.data))

      .catch(() => {});

    selectedLectures.forEach((lecture) => {
      if (lecture.attendance == null) {
        lecture.attendance = "both_absent";
      }
      data.push({
        presences: `${lecture.attendance}`,
        key: lecture.id,
      });
    });
  }, []);

  useEffect(() => {
    api
      .getLocations()
      .then((response: any) => setLocations(response.data))
      .catch((error) => {
        notifyError(
          "Ocorreu um erro",
          "Não foi possível atualizar os dados da sessão"
        );
      });
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

    selectedLectures.map((lecture: any) => {
      if (lecture.attendance == null) {
        lecture.attendance = "both_absent";
      }
      data.push({
        ninja: `${lecture.ninja.first_name} ${lecture.ninja.last_name}`,
        mentor: `${lecture.mentor.first_name} ${lecture.mentor.last_name}`,
        presences: `${lecture.attendance}`,
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
    const hasChanges = JSON.stringify(data) !== JSON.stringify(originalData);

    if (hasChanges) {
      data.forEach((item) => {
        const lectureId = item.key;
        const values = { attendance: item.presences };

        onFinish(values, lectureId);
      });
    }

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

  const getPresencesLabel = (value: string) => {
    switch (value) {
      case "both_absent":
        return "Nenhum";
      case "ninja_absent":
        return "Ninja Faltou";
      case "mentor_absent":
        return "Mentor Faltou";
      case "both_present":
        return "Presentes";
      default:
        return "";
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
        const label = getPresencesLabel(record.presences);
        if (editButtonVisible) {
          return <span>{label}</span>;
        } else {
          return (
            <Select
              value={record.presences}
              onChange={handleComboBoxChange(record.key)}
              style={{ width: 160 }}
            >
              <Select.Option value="both_absent">Nenhum</Select.Option>
              <Select.Option value="ninja_absent">Ninja Faltou</Select.Option>
              <Select.Option value="mentor_absent">Mentor Faltou</Select.Option>
              <Select.Option value="both_present">Presentes</Select.Option>
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
            style={{ width: 450 }}
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
