import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Typography,
  notification,
  Select
} from "antd";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { notifyInfo } from "~/components/InfoNotification";
import AppLayout from "~/layouts/AppLayout";
import { withAuth } from "~/components/Auth";
import * as api from "bokkenjs";
import { useRouter } from "next/router";
import TextArea from "antd/lib/input/TextArea";

const { Title } = Typography;

function CreateEvent() {
  const router = useRouter();
  const [form] = Form.useForm();

  const [locations, setLocations] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    api
      .getLocations()
      .then((response) => setLocations(response.data))
      .catch((error: any) => notification["error"](error.data?.errors));
  }, []);

  useEffect(() => {
    api
      .getTeams()
      .then((response) => setTeams(response.data))
      .catch((error: any) => notification["error"](error.data?.errors));
  }, []);

  const onFinish = (values: any) => {
    api
      .createEvent(values)
      .then(() =>
        notifyInfo("Info", `O Evento ${values["event[title]"]} foi criado com sucesso`)
      )
      .catch((error: any) => notification["error"](error.data?.errors));
  };

  return (
    <AppLayout>
      <Row justify="space-between">
        <Title level={2}>Criar evento</Title>
        <Space>
          <Button
            danger
            shape="circle"
            size="large"
            icon={<CloseOutlined />}
            onClick={() => router.back()}
          />
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
        <Col xs={24} sm={24} md={24} lg={18} xl={18}>
          <Form
            {...{
              labelCol: { span: 8 },
              wrapperCol: { span: 16 },
            }}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              label="Título"
              name="event[title]"
              rules={[
                {
                  type: "string",
                  required: true,
                },
              ]}
            >
              <Input placeholder="Dia da criança" />
            </Form.Item>
            <Form.Item
              label="Online"
              name="event[online]"
              valuePropName="checked"
              rules={[
                {
                  type: "boolean",
                },
              ]}
            >
              <Checkbox />
            </Form.Item>
            <Form.Item
              label="Lugares disponíveis"
              name="event[spots_available]"
              rules={[
                {
                  type: "integer",
                  required: true,
                  validator: (_, value) =>
                    value > 0
                      ? Promise.resolve()
                      : Promise.reject(
                          "O número de lugares disponíveis tem de ser superior a 0"
                        ),
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Data de início do evento"
              name="event[start_time]"
              rules={[
                {
                  type: "date",
                  required: true,
                },
              ]}
            >
              <DatePicker showTime />
            </Form.Item>
            <Form.Item
              label="Data de fim do evento"
              name="event[end_time]"
              rules={[
                {
                  type: "date",
                  required: true,
                },
              ]}
            >
              <DatePicker showTime />
            </Form.Item>
            <Form.Item
              label="Data de início das inscrições"
              name="event[enrollments_open]"
              rules={[
                {
                  type: "date",
                  required: true,
                },
              ]}
            >
              <DatePicker showTime />
            </Form.Item>
            <Form.Item
              label="Data de fim das inscrições"
              name="event[enrollments_close]"
              rules={[
                {
                  type: "date",
                  required: true,
                },
              ]}
            >
              <DatePicker showTime />
            </Form.Item>
            <Form.Item
              label="Localização"
              name="event[location_id]"
              rules={[
                {
                  required: true,
                }
              ]}
            >
              <Select
                placeholder="Selecionar localização"
                value={locations}
              >
                {locations.map((location: any) => {
                  <Select.Option key={location.id} value={location.id}>
                    {location.adress}
                  </Select.Option>
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Equipa"
              name="event[team_id]"
              rules={[
                {
                  required: true,
                }
              ]}
            >
              <Select
                placeholder="Selecionar equipa"
              >
                {teams.map((team: any) => {
                  <Select.Option key={team.id} value={team.id}>
                    {team.name}
                  </Select.Option>
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Notas"
              name="event[notes]"
              rules={[
                {
                  type: "string",
                },
              ]}
            >
              <TextArea />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </AppLayout>
  );
}

export default withAuth(CreateEvent);
