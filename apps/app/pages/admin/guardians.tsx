import Link from "next/link";
import React, { useEffect, useState } from "react";
import { withAuth } from "~/components/Auth";
import AppLayout from "~/layouts/AppLayout";
import {
  Avatar,
  Checkbox,
  Input,
  Form,
  Table,
  Popconfirm,
  Typography,
  notification,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getGuardiansAsAdmin, updateGuardianAsAdmin } from "bokkenjs";
import moment from "moment";

const { Title } = Typography;

interface Item {
  key: string;
  guardian_id: string;
  photo: any;
  name: string;
  mobile: string;
  city: string;
  email: string;
  active: boolean;
  verified: boolean;
  registered: boolean;
  since: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "string" | "checkbox";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const checkBoxValue = (): boolean => {
    switch (dataIndex) {
      case "verified":
        return record?.verified;
      case "active":
        return record?.active;
      case "registered":
        return record?.registered;
    }

    return false;
  };

  const inputNode =
    inputType === "string" ? (
      <Input />
    ) : (
      <Checkbox defaultChecked={checkBoxValue()} />
    );

  return (
    <td {...restProps}>
      {editing ? (
        inputType === "checkbox" ? (
          <Form.Item
            valuePropName="checked"
            name={dataIndex}
            style={{ margin: 0 }}
          >
            {inputNode}
          </Form.Item>
        ) : (
          <Form.Item name={dataIndex} style={{ margin: 0 }}>
            {inputNode}
          </Form.Item>
        )
      ) : (
        children
      )}
    </td>
  );
};

function Guardians() {
  const [form] = Form.useForm();
  const [guardians, setGuardians] = useState<Item[]>([]);

  const [editingKey, setEditingKey] = useState<string>("");
  const isEditing = (record: Item) => record.key === editingKey;

  useEffect(() => {
    getGuardiansAsAdmin()
      .then((response: any) => {
        setGuardians(
          response.data.map((guardian: any) => {
            return {
              ...guardian,
              name: `${guardian.first_name} ${guardian.last_name}`,
              key: guardian.user_id,
              guardian_id: guardian.id,
            };
          })
        );
      })
      .catch((error: any) => notification["error"](error.data?.errors));
  }, [editingKey]);

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({
      name: "",
      email: "",
      birthday: "",
      mobile: "",
      city: "",
      verified: false,
      active: false,
      registered: false,
      since: "",
      ...record,
    });

    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key, guardian_id: string) => {
    const row = (await form.validateFields()) as Item;

    const user = {
      user_id: key,
      verified: row.verified,
      active: row.active,
      registered: row.registered,
    };

    const guardian = {
      id: guardian_id,
    };

    const data = {
      user,
      guardian,
    };

    updateGuardianAsAdmin(data);

    setEditingKey("");
  };

  const columns = [
    {
      title: "Foto",
      dataIndex: "photo",
      render: (photo: any) => <Avatar src={photo} icon={<UserOutlined />} />,
      editable: false,
    },
    {
      title: "Nome",
      dataIndex: "name",
      editable: false,
    },
    {
      title: "E-mail",
      dataIndex: "email",
      editable: false,
    },
    {
      title: "Número de telemóvel",
      dataIndex: "mobile",
      editable: false,
    },
    {
      title: "Cidade",
      dataIndex: "city",
      editable: false,
    },
    {
      title: "Verificado",
      dataIndex: "verified",
      editable: true,
      render: (verified: boolean) => <Checkbox checked={verified} />,
    },
    {
      title: "Ativo",
      dataIndex: "active",
      editable: true,
      render: (active: boolean) => <Checkbox checked={active} />,
    },
    {
      title: "Registado",
      dataIndex: "registered",
      editable: true,
      render: (registered: boolean) => <Checkbox checked={registered} />,
    },
    {
      title: "Data de inscrição",
      dataIndex: "since",
      editable: false,
      render: (since: string) => moment(since).format("DD-MM-YYYY"),
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);

        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key, record.guardian_id)}
              style={{ marginRight: 8 }}
            >
              Guardar
            </Typography.Link>
            <Popconfirm
              title="Tens a certeza que queres cancelar?"
              onConfirm={cancel}
            >
              <a>Cancelar</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Link href={`/profile/guardian/${record?.guardian_id}`}>
              <a style={{ marginRight: 8 }}>Ver</a>
            </Link>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Editar
            </Typography.Link>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: ["verified", "active", "registered"].includes(col.dataIndex)
          ? "checkbox"
          : "string",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <AppLayout>
      <Title level={2}>Guardiões</Title>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={guardians}
          columns={mergedColumns}
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </AppLayout>
  );
}

export default withAuth(Guardians);
