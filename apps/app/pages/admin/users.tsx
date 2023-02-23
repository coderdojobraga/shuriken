import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import {
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
import { getUsersAsAdmin, updateUserAsAdmin } from "bokkenjs";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { withAuth } from "~/components/Auth";
import { notifyError } from "~/components/Notification";
import AppLayout from "~/layouts/AppLayout";

const { Title } = Typography;

interface Item {
  key: string;
  user_id: string;
  email: string;
  role: string;
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

function Users() {
  const [form] = Form.useForm();
  const [users, setUsers] = useState<Item[]>([]);

  const [editingKey, setEditingKey] = useState<string>("");
  const isEditing = (record: Item) => record.key === editingKey;

  const [searchText, setSearchText] = useState<string>("");
  const [searchedColumn, setSearchedColumn] = useState<string>("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    getUsersAsAdmin()
      .then((response: any) => {
        setUsers(
          response.data.map((user: any) => {
            return {
              ...user,
              key: user.id,
            };
          })
        );
      })
      .catch((_error: any) =>
        notifyError(
          "Ocorreu um erro",
          "Não foi possível obter os dados dos utilizadores"
        )
      );
  }, [editingKey]);

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({
      email: "",
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

  const save = async (key: React.Key) => {
    const row = (await form.validateFields()) as Item;

    const user = {
      user: {
        verified: row.verified,
        active: row.active,
        registered: row.registered,
      },
    };

    updateUserAsAdmin(key, user);

    setEditingKey("");
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
          placeholder={`Pesquisar ${
            dataIndex == "email" ? "e-mail" : dataIndex
          }`}
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

  const columns = [
    {
      title: "E-mail",
      dataIndex: "email",
      editable: false,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Tipo",
      dataIndex: "role",
      editable: false,
      render: (role: string) => {
        switch (role) {
          case "mentor":
            return "Mentor";
          case "ninja":
            return "Ninja";
          case "guardian":
            return "Guardião";
          case "organizer":
            return "Organizador";
        }
      },
      filters: [
        {
          text: "Mentor",
          value: "mentor",
        },
        {
          text: "Ninja",
          value: "ninja",
        },
        {
          text: "Guardião",
          value: "guardian",
        },
        {
          text: "Organizador",
          value: "organizer",
        },
      ],
      onFilter: (value: any, record: Item) => record.role.indexOf(value) === 0,
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
      sorter: (a: any, b: any) => a.active - b.active,
      defaultSortOrder: "ascend",
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
              onClick={() => save(record.key)}
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
      <Title level={2}>Utilizadores</Title>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={users}
          columns={mergedColumns}
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </AppLayout>
  );
}

export default withAuth(Users);
