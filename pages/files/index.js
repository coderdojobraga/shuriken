import { useEffect, useState } from "react";
import { Button, Col, Row, Typography } from "antd";
import { withAuth } from "~/components/Auth";
import AppLayout from "~/components/layouts/AppLayout";
import Document from "~/components/Document";
import * as api from "~/lib/utils/api.js";
import LinkTo from "~/components/utils/LinkTo";

const { Title } = Typography;

function Files() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    api
      .getFiles()
      .then((response) => setFiles(response.data))
      .catch();
  }, []);

  return (
    <AppLayout>
      <Row justify="space-between">
        <Col>
          <Title level={2}>Os Meus Ficheiros</Title>
        </Col>
        <Col>
          <LinkTo href="/files/new">
            <Button type="primary">Novo</Button>
          </LinkTo>
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
