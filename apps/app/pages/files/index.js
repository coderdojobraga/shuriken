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

  const onFileDeletion = (id) => {
    setFiles((previous) => previous.filter((file) => file.id != id));
  };

  return (
    <AppLayout>
      <Row justify="space-between">
        <Col>
          <Title level={2}>Os Meus Ficheiros</Title>
        </Col>
      </Row>
      {files.length != 0 ? (
        <Row justify="start" align="top">
          {files.map((file) => (
            <Document
              key={file.id}
              editable
              onFileDeletion={onFileDeletion}
              {...file}
            />
          ))}
        </Row>
      ) : (
        <div class="mt-10 text-center">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              vector-effect="non-scaling-stroke"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 class="mt-2 text-sm font-semibold text-gray-900">Sem ficheiros</h3>
          <div class="mt-6">
            <Link href="/files/new">
              <Button type="primary">Novo</Button>
            </Link>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

export default withAuth(Files);
