import { useState } from "react";
import Link from "next/link";
import { Card, Input, Modal } from "antd";
import {
  CloseOutlined,
  DownloadOutlined,
  EditOutlined,
  PaperClipOutlined,
  SaveOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { notifyError, notifyInfo } from "~/components/Notification";
import * as api from "bokkenjs";

const { Meta } = Card;

function Document({ id, title, description, document, editable = false, onFileDeletion }) {
  const [isEditing, setEditing] = useState(false);
  const [doc, setDoc] = useState({ title, description });
  const [info, setInfo] = useState({ title, description });

  const { confirm } = Modal;

  const showDeleteConfirmationModal = () => {
    confirm({
      width: '30rem',
      title: 'Tens a certeza que queres apagar este ficheiro?',
      icon: <ExclamationCircleFilled />,
      content: 'Após confirmares não será possível recuperar o ficheiro!',
      okText: 'Apagar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: deleteFile,
    });
  }

  const deleteFile = async () => {
    try {
      await api.deleteFile(id);
      onFileDeletion(id);
      notifyInfo("O ficheiro foi apagado com sucesso");
    } catch (error) {
      notifyError("Ocorreu um erro", "Não foi possível apagar o ficheiro");
    }
  }

  const updateInfo = () => {
    api
      .editFile(id, info)
      .then((response) => {
        setDoc(response.data);
        setInfo(response.data);
        notifyInfo("O ficheiro foi editado com sucesso");
      })
      .catch((error) => {
        notifyError("Ocorreu um erro", "Não foi possível editar o ficheiro");
      });
  };

  return (
    <Card
      style={{ width: 300, margin: 16 }}
      actions={
        !editable
          ? [
              <DeleteOutlined
                key="delete"
                onClick={() => {
                  showDeleteConfirmationModal();
                }}
              />,
              <Link key="download" target="_blank" href={document}>
                <DownloadOutlined aria-label="Download File" />
              </Link>,
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
              <DeleteOutlined
                key="delete"
                onClick={() => {
                  showDeleteConfirmationModal();
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
              <Link key="download" target="_blank" href={document}>
                <DownloadOutlined />
              </Link>,
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
