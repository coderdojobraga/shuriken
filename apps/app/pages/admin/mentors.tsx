import Link from "next/link";
import React, { useEffect, useState } from "react";
import { withAuth } from "~/components/Auth";
import { useAuth } from "@coderdojobraga/ui";
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
import { getMentorsAsAdmin, updateUserAsAdmin } from "bokkenjs";
import moment from "moment";

const { Title } = Typography;

interface Item {
  key: string;
  mentor_id: string;
  photo: any;
  name: string;
  email: string;
  birthday: string;
  mobile: string;
  major: string;
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

function Mentors() {
  const [form] = Form.useForm();
  const [mentors, setMentors] = useState<Item[]>([]);

  const [editingKey, setEditingKey] = useState<string>("");
  const isEditing = (record: Item) => record.key === editingKey;

  useEffect(() => {
    getMentorsAsAdmin()
      .then((response: any) => {
        setMentors(
          response.data.map((mentor: any) => {
            return {
              ...mentor,
              name: `${mentor.first_name} ${mentor.last_name}`,
              key: mentor.user_id,
              mentor_id: mentor.id,
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
      major: "",
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

  const save = async (key: React.Key, mentor_id: string) => {
    const row = (await form.validateFields()) as Item;

    const user = {
      user_id: key,
      verified: row.verified,
      active: row.active,
      registered: row.registered,
    };

    const mentor = {
      id: mentor_id,
    };

    const data = {
      user,
      mentor,
    };

    updateUserAsAdmin(data);

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
      title: "Data de nascimento",
      dataIndex: "birthday",
      editable: false,
      render: (birthday: string) => moment(birthday).format("DD-MM-YYYY"),
    },
    {
      title: "Número de telemóvel",
      dataIndex: "mobile",
      editable: false,
    },
    {
      title: "Curso",
      dataIndex: "major",
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
              onClick={() => save(record.key, record.mentor_id)}
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
            <Link href={`/profile/mentor/${record?.mentor_id}`}>
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
      <Title level={2}>Mentores</Title>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={mentors}
          columns={mergedColumns}
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </AppLayout>
  );
}

export default withAuth(Mentors);
