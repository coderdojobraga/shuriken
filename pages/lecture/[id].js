import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar, Button, Form, Input, Row, Col, Typography, Space } from "antd";
import {
  BranchesOutlined,
  CalendarOutlined,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuth, withAuth } from "~/components/Auth";
import AppLayout from "~/components/layouts/AppLayout";
import LinkTo from "~/components/utils/LinkTo";
import * as api from "~/lib/api";
import * as USER from "~/lib/user";
import Belt from "~/components/Belt";
import moment from "moment";


function Lectures() {
  const { Title, Text } = Typography;
  const router = useRouter();
  const { id } = router.query;
  const [form] = Form.useForm();
  const { user } = useAuth();
  const onFinish = (values) => {
    api
      .updateLecture(id, values)
      .then(() => router.push("/dashboard"))
      .catch((error) => notification["error"](error.data?.errors));
  };


  const [lecture, setLecture] = useState({});

  useEffect(() => {
    api
    .getLecture(id)
    .then((response) => setLecture(response.data))
    .catch((error) => notification["error"](error.data?.errors));
  }, []);

  let attendance = "";
  switch(lecture.attendance) {
    case "both_present":
      attendance = "Ambos Presentes";
      break;
    case "both_absent":
      attendance = "Ambos Faltaram";
      break;
    case "mentor_absent":
      attendance = "Mentor Faltou";
      break;
    case "ninja_absent":
      attendance = "Ninja faltou";
      break;
    default:
      break;
  }

  useEffect(() => {
    form.resetFields();
  }, [lecture]);

  const editable = lecture && user.role == USER.ROLES.MENTOR && user.mentor.id == lecture.mentor.id;

  return (
    <AppLayout>
        <Row  justify="space-between" gutter={[10, 10]}>
          <Col>
            <Title level={1}>Detalhes de sessão</Title>
          </Col>
            
            <Col>
          {!editable || <Space>
            <Button onClick={() => router.push("/dashboard")}>Cancelar</Button>
            <Button onClick={() => form.submit()} type="primary">
              Guardar
            </Button>
          </Space>}
        </Col>
        </Row>
      <Row align="middle" gutter={[16, 16]}>
        <Col>
          <CalendarOutlined
            style={{
              verticalAlign: "middle",
              paddingBottom: "2px",
            }}
          />
        </Col>
        <Col>
          <Text>
            {!lecture.event || moment(new Date(lecture.event.start_time)).format("DD/MM/YYYY")}
          </Text>
        </Col>
      </Row>

      <Row align="middle" gutter={[10, 10]}>
        <Col>
            <Text>Mentor:</Text>
        </Col>
        <Col>
          <Avatar
            src={!lecture.mentor || lecture.mentor.photo}
            size="large"
            alt="Avatar Mentor"
            icon={<UserOutlined />}
          />
        </Col>
        <Col>
          <Text>{`${!lecture.mentor || lecture.mentor.first_name} ${!lecture.mentor || lecture.mentor.last_name}`}</Text>
        </Col>
      </Row>
      <Row align="middle" gutter={[10, 10]}>
      <Col>
            <Text>Ninja:</Text>
        </Col>
        <Col>
          <Avatar
            src={!lecture.ninja || lecture.ninja.photo}
            size="large"
            alt="Avatar Ninja"
            icon={<UserOutlined />}
          />
        </Col>
        <Col>
          <Text>{`${!lecture.ninja || lecture.ninja.first_name} ${!lecture.ninja || lecture.ninja.last_name}`}</Text>
        </Col>
      </Row>

      <Row>
        <Text>
            {attendance}
        </Text>
      </Row>

      <Row align="middle" gutter={[10, 10]}>
        <Form
            form={form}
            onFinish={onFinish}
            layout="horiontal"
            style={{width: "100%"}}
            disabled={!editable}
        >
          <Form.Item name="summary" label="Sumário">
            <Input.TextArea placeholder="Um sumário da sessão" defaultValue={lecture.summary}/>
          </Form.Item>

          <Form.Item name="notes" label="Notas">
            <Input.TextArea placeholder="Notas adicionais" defaultValue={lecture.notes}/>
          </Form.Item>
        </Form>
      </Row>
    </AppLayout>
  );
}

export default withAuth(Lectures);
