import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import {
  Avatar,
  Button,
  Checkbox,
  Form,
  Input,
  Popconfirm,
  Space,
  Table,
  Typography,
} from "antd";
import type { ColumnType } from "antd/es/table";
import { FilterConfirmProps } from "antd/lib/table/interface";
import { getMentorsAsAdmin, updateMentorAsAdmin } from "bokkenjs";
import moment from "moment";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { withAuth } from "~/components/Auth";
import { notifyError } from "~/components/Notification";
import AppLayout from "~/layouts/AppLayout";

const { Title } = Typography;

interface Item {
  key: string;
  user_id: string;
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

  const [searchText, setSearchText] = useState<string>("");
  const [searchedColumn, setSearchedColumn] = useState<string>("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    getMentorsAsAdmin()
      .then((response: any) => {
        setMentors(
          response.data.map((mentor: any) => {
            return {
              ...mentor,
              name: `${mentor.first_name} ${mentor.last_name}`,
              key: mentor.id,
            };
          })
        );
      })
      .catch((_error) =>
        notifyError(
          "Ocorreu um erro",
          "Não foi possível obter os dados dos mentores"
        )
      );
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

  const save = async (key: React.Key, user_id: string) => {
    const row = (await form.validateFields()) as Item;

    const user = {
      user_id: user_id,
      verified: row.verified,
      active: row.active,
      registered: row.registered,
    };

    // Add here the related mentor fields that you want to update
    const mentor = {};

    const data = {
      user,
      mentor,
    };

    updateMentorAsAdmin(key, data).catch((_error) =>
      notifyError(
        "Ocorreu um erro",
        "Não foi possível atualizar os dados do mentor"
      )
    );

    cancel();
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: string): ColumnType<any> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={getPlaceHolder(dataIndex)}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 100 }}
          >
            Pesquisar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Resetar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const getPlaceHolder = (dataIndex: string) => {
    switch (dataIndex) {
      case "name":
        return "Pesquisar por nome";
      case "email":
        return "Pesquisar por e-mail";
      default:
        return `Pesquisar por ${dataIndex}`;
    }
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
      ...getColumnSearchProps("name"),
    },
    {
      title: "E-mail",
      dataIndex: "email",
      editable: false,
      ...getColumnSearchProps("email"),
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
      sorter: (a: Item, b: Item) =>
        moment(a.since).unix() - moment(b.since).unix(),
      defaultSortOrder: "descend",
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);

        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key, record.user_id)}
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
            <Link href={`/profile/mentor/${record.key}`}>
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

  const mergedColumns = columns.map((col: any) => {
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
