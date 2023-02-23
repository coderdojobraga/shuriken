import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  Typography,
  notification,
} from "antd";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import * as api from "bokkenjs";
import { useAuth } from "@coderdojobraga/ui";
import { withAuth } from "~/components/Auth";
import AppLayout from "~/layouts/AppLayout";
import dayjs from "dayjs";
import { EUser } from "bokkenjs";
import { notifyError, notifyInfo } from "~/components/Notification";

function Lectures() {
  const { Title, Text } = Typography;
  const router = useRouter();
  const { id } = router.query;
  const [form] = Form.useForm();
  const { user } = useAuth();
  const onFinish = (values: any) => {
    api
      .updateLecture(id as string, values)
      .then(() => {
        notifyInfo("Os dados da sessão foram atualizados com sucesso", "");
        router.push("/");
      })
      .catch((error) => {
        notifyError(
          "Ocorreu um erro",
          "Não foi possível atualizar os dados da sessão"
        );
      });
  };

  const [lecture, setLecture] = useState<any>({});

  useEffect(() => {
    api
      .getLecture(id as string)
      .then((response) => setLecture(response.data))
      .catch((error) => {
        notifyError("Ocorreu um erro", "Não foi obter os dados da sessão");
      });
  }, [id]);

  let attendance = "";
  switch (lecture.attendance) {
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
  }, [lecture, form]);

  const editable =
    lecture?.mentor &&
    user?.role === EUser.Mentor &&
    user?.mentor_id == lecture.mentor.id;

  return (
    <AppLayout>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Row justify="space-between" gutter={[10, 10]}>
          <Col>
            <Title level={1}>Detalhes de sessão</Title>
          </Col>

          <Col>
            {!editable || (
              <Space>
                <Button onClick={() => router.push("/")}>Cancelar</Button>
                <Button onClick={() => form.submit()} type="primary">
                  Guardar
                </Button>
              </Space>
            )}
          </Col>
        </Row>
        <Row>
          <Text>
            Evento: {!lecture.event || lecture.event.title || "Sem título"}
          </Text>
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
              {!lecture.event ||
                dayjs(new Date(lecture.event.start_time)).format("DD/MM/YYYY")}
            </Text>
          </Col>
        </Row>

        <Row align="middle" gutter={[10, 10]}>
          <Col>
            <Text>Mentor(a):</Text>
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
            <Text>{`${!lecture.mentor || lecture.mentor.first_name} ${
              !lecture.mentor || lecture.mentor.last_name
            }`}</Text>
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
            <Text>{`${!lecture.ninja || lecture.ninja.first_name} ${
              !lecture.ninja || lecture.ninja.last_name
            }`}</Text>
          </Col>
        </Row>

        <Row>
          <Text>Presenças: {attendance}</Text>
        </Row>

        <Row align="middle" gutter={[10, 10]}>
          <Col style={{ width: "100%" }}>
            <Form
              form={form}
              onFinish={onFinish}
              layout="horizontal"
              style={{ width: "100%" }}
              disabled={!editable}
            >
              <Form.Item name="summary" label="Sumário">
                <Input.TextArea
                  placeholder="Um sumário da sessão"
                  defaultValue={lecture.summary}
                />
              </Form.Item>

              <Form.Item name="notes" label="Notas">
                <Input.TextArea
                  placeholder="Notas adicionais"
                  defaultValue={lecture.notes}
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Space>
    </AppLayout>
  );
}

export default withAuth(Lectures);
