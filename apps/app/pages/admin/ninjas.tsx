import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import {
  Avatar,
  Button,
  Form,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import type { ColumnType } from "antd/es/table";
import { FilterConfirmProps } from "antd/lib/table/interface";
import { getNinjasAsAdmin, updateNinjaAsAdmin } from "bokkenjs";
import moment from "moment";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { withAuth } from "~/components/Auth";
import Belt from "~/components/Belt";
import { notifyError } from "~/components/Notification";
import AppLayout from "~/layouts/AppLayout";

const { Title } = Typography;
const { Option } = Select;

interface Item {
  key: string;
  photo: any;
  name: string;
  birthday: string;
  belt: string;
  since: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "string" | "belt";
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
  const inputNode =
    inputType === "belt" ? <Option value="white">White</Option> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={dataIndex} style={{ margin: 0 }}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function Ninjas() {
  const [form] = Form.useForm();
  const [ninjas, setNinjas] = useState<Item[]>([]);

  const [editingKey, setEditingKey] = useState<string>("");
  const isEditing = (record: Item) => record.key === editingKey;

  const [searchText, setSearchText] = useState<string>("");
  const [searchedColumn, setSearchedColumn] = useState<string>("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    getNinjasAsAdmin()
      .then((response: any) => {
        setNinjas(
          response.data.map((ninja: any) => {
            return {
              ...ninja,
              name: `${ninja.first_name} ${ninja.last_name}`,
              key: ninja.id,
            };
          })
        );
      })
      .catch((_error) =>
        notifyError(
          "Ocorreu um erro",
          "Não foi possível obter os dados dos ninjas"
        )
      );
  }, [editingKey]);

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({
      name: "",
      birthday: "",
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

    const data = {
      id: key,
    };

    updateNinjaAsAdmin(data);

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
          placeholder={`Pesquisar ${dataIndex}`}
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
      title: "Cinturão",
      dataIndex: "belt",
      editable: true,
      render: (belt: string) => <Belt belt={belt} />,
    },
    {
      title: "Data de nascimento",
      dataIndex: "birthday",
      editable: false,
      render: (birthday: string) => moment(birthday).format("DD-MM-YYYY"),
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
            <Link href={`/profile/ninja/${record.key}`}>
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
        inputType: col.dataIndex == "belt" ? "belt" : "string",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <AppLayout>
      <Title level={2}>Ninjas</Title>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={ninjas}
          columns={mergedColumns}
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </AppLayout>
  );
}

export default withAuth(Ninjas);
