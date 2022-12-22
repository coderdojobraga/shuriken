import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Col, Row, Typography } from "antd";
import { withAuth } from "~/components/Auth";
import AppLayout from "~/layouts/AppLayout";
import Document from "~/components/Document";
import * as api from "bokkenjs";
import { notifyError } from "~/components/Notification";

const { Title } = Typography;

function Files() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    api
      .getFiles()
      .then((response) => setFiles(response.data))
      .catch((error) => {
        notifyError("Ocorreu um erro", "Não foi possível obter os ficheiros");
      });
  }, []);

  return (
    <AppLayout>
      <Row justify="space-between">
        <Col>
          <Title level={2}>Os Meus Ficheiros</Title>
        </Col>
        <Col>
          <Link href="/files/new">
            <Button type="primary">Novo</Button>
          </Link>
        </Col>
      </Row>
      <Row justify="start" align="top">
        {files.map((file) => (
          <Document key={file.id} editable {...file} />
        ))}
      </Row>
    </AppLayout>
  );
}

export default withAuth(Files);
