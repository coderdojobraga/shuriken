import { Card, Input } from "antd";
import {
  CloseOutlined,
  DownloadOutlined,
  EditOutlined,
  PaperClipOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import * as api from "~/lib/api.js";
import LinkTo from "~/components/utils/LinkTo";
import { useState } from "react";

const { Meta } = Card;

function Document({ id, title, description, document, editable = false }) {
  const [isEditing, setEditing] = useState(false);
  const [doc, setDoc] = useState({ title, description });
  const [info, setInfo] = useState({ title, description });

  const updateInfo = () => {
    api
      .editFile(id, info)
      .then((response) => setDoc(response.data) && setInfo(response.data))
      .catch();
  };

  return (
    <Card
      style={{ width: 300, margin: 16 }}
      actions={
        !editable
          ? [
              <LinkTo key="download" target="_blank" href={document}>
                <DownloadOutlined />
              </LinkTo>,
            ]
          : isEditing
          ? [
              <CloseOutlined
                key="close"
                onClick={() => {
                  setInfo(doc);
                  setEditing(!isEditing);
                }}
              />,
              <SaveOutlined
                key="save"
                onClick={() => {
                  updateInfo();
                  setEditing(!isEditing);
                }}
              />,
            ]
          : [
              <EditOutlined
                key="edit"
                onClick={() => setEditing(!isEditing)}
              />,
              <LinkTo key="download" target="_blank" href={document}>
                <DownloadOutlined />
              </LinkTo>,
            ]
      }
    >
      <Meta
        title={
          isEditing ? (
            <Input
              onChange={(e) =>
                setInfo({ ...info, ...{ title: e.target.value } })
              }
              bordered={false}
              placeholder="Título"
              defaultValue={info.title}
            />
          ) : (
            doc.title
          )
        }
        editable
        description={
          <>
            {isEditing ? (
              <Input.TextArea
                autoSize
                onChange={(e) =>
                  setInfo({ ...info, ...{ description: e.target.value } })
                }
                bordered={false}
                placeholder="Descrição"
                defaultValue={info.description}
              />
            ) : (
              doc.description
            )}
            <br />
            <br />
            <PaperClipOutlined /> {new URL(document).pathname.split("/").pop()}
          </>
        }
      />
    </Card>
  );
}

export default Document;
