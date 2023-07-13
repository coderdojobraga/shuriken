import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import {
  Avatar,
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Popconfirm,
  Space,
  Table,
  Typography,
} from "antd";
import type { ColumnType } from "antd/es/table";
import { FilterConfirmProps } from "antd/lib/table/interface";
import { EBelt,getGuardiansAsAdmin, updateGuardianAsAdmin , getNinjasAsAdmin, updateNinjaAsAdmin,getMentorsAsAdmin, updateMentorAsAdmin} from "bokkenjs";
import moment from "moment";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { withAuth } from "~/components/Auth";
import { notifyError } from "~/components/Notification";
import AppLayout from "~/layouts/AppLayout";
import Belt from "~/components/Belt";
import { BELT_PT } from "~/lib/belt";


const { Title } = Typography;
const { Option } = Select;


    interface GuardianItem {
    key: string;
    user_id: string;
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
  interface MentorItem {
    key: string;
    user_id: string;
    photo: any;
    mentor: {
      id: string;
      name: string;
    };
    email: string;
    birthday: string;
    mobile: string;
    major: string;
    active: boolean;
    verified: boolean;
    registered: boolean;
    since: string;
  }

  interface NinjaItem {
    key: string;
    photo: any;
    ninja: {
      id: string;
      name: string;
    };
    birthday: string;
    belt: string;
    guardian: {
      id: string;
      name: string;
    };
    since: string;
  }
  interface users {
    key: string;
    user_id: string;
    email: string;
    role: string;
    active: boolean;
    verified: boolean;
    registered: boolean;
    since: string;
  }
  interface TableProps {
    userType: 'ninja' | 'guardian' | 'mentor' | 'users';
    data: NinjaItem[] | GuardianItem[] | MentorItem[] | users[];
  }

  interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "string" | "select" | "checkbox";
    record: NinjaItem | GuardianItem | MentorItem | users;
    index: number;
    children: React.ReactNode;
  }
  
  const EditableCell: React.FC<EditableCellProps> = (props) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = props;
  

    if (inputType === "checkbox") {
        const checkBoxValue = (): boolean => {
          switch (dataIndex) {
            case "verified":
              return record && "verified" in record ? record.verified : false;
            case "active":
              return record && "active" in record ? record.active : false;
            case "registered":
              return record && "registered" in record ? record.registered : false;
            default:
              return false;
          }
        };

      const inputNode = <Checkbox defaultChecked={checkBoxValue()} />;
  
      return (
        <td {...restProps}>
          {editing ? (
            <Form.Item valuePropName="checked" name={dataIndex} style={{ margin: 0 }}>
              {inputNode}
            </Form.Item>
          ) : (
            children
          )}
        </td>
      );
    }
  
    const inputNode =
      inputType === "string" ? (
        <Input />
      ) : (
        <Select>
          {Object.keys(BELT_PT).map((belt) => (
            <Option key={belt} value={belt}>
              <Belt belt={belt as EBelt} />
            </Option>
          ))}
        </Select>
      );
  
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




function TableEuser({ userType, data }: TableProps) {   
    const [form] = Form.useForm();
    const [mentors, setMentors] = useState<[]>([]);
    const [guardians, setGuardians] = useState<[]>([]);
    const [ninjas, setNinjas] = useState<[]>([]);
    const [users, setUsers] = useState<[]>([]);
    
    const [editingKey, setEditingKey] = useState<string>("");
    const isEditing = (record: NinjaItem | GuardianItem | MentorItem) => record.key === editingKey;

    
    const [searchText, setSearchText] = useState<string>("");
    const [searchedColumn, setSearchedColumn] = useState<string>("");
    const searchInput = useRef<InputRef>(null);

    useEffect(() => {
        if (userType === 'ninja') {
            getNinjasAsAdmin()
            .then((response: any) => {
              setNinjas(
                response.data.map((ninja: any) => {
                  const ninjaData = {
                    id: ninja.id,
                    name: `${ninja?.first_name} ${ninja?.last_name}`,
                  };
                  return {
                    ...ninja,
                    key: ninja?.id,
                    guardian: buildGuardian(ninja.guardian),
                    ninja: ninjaData,
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
        
        }else if (userType === 'guardian') {
            getGuardiansAsAdmin()
            .then((response: any) => {
              setGuardians(
                response.data.map((guardian: any) => {
                  const guardianData = {
                    id: guardian.id,
                    name: `${guardian.first_name} ${guardian.last_name}`,
                  };
                  return {
                    ...guardian,
                    name: `${guardian.first_name} ${guardian.last_name}`,
                    key: guardian.id,
                    guardian: guardianData,
                  };
                })
              );
            })
            .catch((_error) =>
              notifyError(
                "Ocorre um erro",
                "Não foi possível obter os dados dos guardiões"
              )
            );
            
        }else if (userType === 'mentor') {
            getMentorsAsAdmin()
            .then((response: any) => {
              setMentors(
                response.data.map((mentor: any) => {
                  const mentorData = {
                    id: mentor.id,
                    name: `${mentor.first_name} ${mentor.last_name}`,
                  };
                  return {
                    ...mentor,
                    name: `${mentor.first_name} ${mentor.last_name}`,
                    key: mentor.id,
                    mentor: mentorData,
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
        }
    }, [data, userType]);


    const handleSave = async (key: React.Key, userType: 'ninja' | 'guardian' | 'mentor', formValues: any) => {
        const row = (await form.validateFields()) as  typeof formValues ;
      
        const user = {
          user_id: row.user_id,
          verified: row.verified,
          active: row.active,
          registered: row.registered,
        };
      
        let data: any = {
          user,
        };
      
        if (userType === 'ninja') {
          // Add here the related ninja fields that you want to update
          const ninja = {
            belt: row.belt,
          };
          data = {
            ...data,
            ninja,
          };
        } else if (userType === 'guardian') {
          // Add here the related guardian fields that you want to update
          const guardian = {

          };
          data = {
            ...data,
            guardian,
          };
        } else if (userType === 'mentor') {
          // Add here the related mentor fields that you want to update
          const mentor = {};
          data = {
            ...data,
            mentor,
          };
        }
      
        // Perform the API call to update the user based on the userType
        if (userType === 'ninja') {
          updateNinjaAsAdmin(key, data).catch((_error) =>
            notifyError("Ocorreu um erro", "Não foi possível atualizar os dados do ninja")
          );
        } else if (userType === 'guardian') {
          updateGuardianAsAdmin(key, data).catch((_error) =>
            notifyError("Ocorreu um erro", "Não foi possível atualizar os dados do guardião")
          );
        } else if (userType === 'mentor') {
          updateMentorAsAdmin(key, data).catch((_error) =>
            notifyError("Ocorreu um erro", "Não foi possível atualizar os dados do mentor")
          );
        }
      
        cancel();
      };
      
      const edit = (record: Partial<TableProps> & { key: React.Key }) => {
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
      
        setEditingKey(String(record.key));
      };
      
      const cancel = () => {
        setEditingKey("");
      };
      
      const save = (key: React.Key, userType: 'ninja' | 'guardian' | 'mentor', formValues: any) => {
        handleSave(key, userType, formValues);
      };
      
    

    const buildGuardian = (guardian: any) => {
        return {
          id: guardian?.id,
          name: `${guardian?.first_name} ${guardian?.last_name}`,
        };
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
    }
    const columns = (userType: 'ninja' | 'guardian' | 'mentor') => {
        let columns = [
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
            render: (data: any) => (
              <Link href={`/profile/${userType}/${data.id}`}>
                <a>{data.name}</a>
              </Link>
            ),
          },
          
        ];
      
        if (userType === "ninja") {
          columns.push({
            title: "Cinturão",
            dataIndex: "belt",
            editable: true,
            render: (belt: string) => <Belt belt={belt} />,
          });
        } else if (userType === "guardian" || userType === "mentor") {
          columns.push({
            title: "E-mail",
            dataIndex: "email",
            editable: false,
            ...getColumnSearchProps("email"),
            render: (email: string): JSX.Element => <span>{email}</span>,
          });
        }

        if(userType === "ninja" ) {
            columns.push({
              title:"data de nascimento",
              dataIndex: "birthday",
              editable: false,
              render: (birthday: string) => <span>{birthday}.format("DD-MM-YYYY")</span>,
            });
        } else if(userType === "guardian" || userType === "mentor") {
            columns.push({
              title:"Numero de telemovel",
              dataIndex: "mobile",
              editable: false,
              render: (mobile: string) => <span>{mobile}</span>,
            });
        }

        if(userType === "mentor") {
            columns.push({
                title:"data de nascimento",
                dataIndex: "birthday",
                editable: false,
                render: (birthday: string) => <span>{birthday}.format("DD-MM-YYYY")</span>,
              });
        } else if(userType === "guardian") {
            columns.push({
                title:"Cidade",
                dataIndex: "city",
                editable: false,
                render: (city: string) => <span>{city}</span>,
              });   
        } else if(userType === "ninja") {
            columns.push({
                title: "Guardião",
                dataIndex: "guardian",
                editable: false,
                render: (guardian: any) => (
                  <Link href={`/profile/guardian/${guardian.id}`}>
                    <a>{guardian.name}</a>
                  </Link>
                ),
              });   
        }

        if(userType==="mentor"){
            columns.push({
                title:"Curso",
                dataIndex: "major",
                editable: false,
                render: (major: string) => <span>{major}</span>,
              });
        }
        if(userType==="mentor" || userType==="guardian"){
            columns.push({
                title: "Verificado",
                dataIndex: "verified",
                editable: true,
                render: (verified: boolean) => <Checkbox checked={verified} />,
              });
            columns.push({
                title: "Ativo",
                dataIndex: "active",
                editable: true,
                render: (active: boolean) => <Checkbox checked={active} />,
              });
            columns.push({
                title: "Registado",
                dataIndex: "registered",
                editable: true,
                render: (registered: boolean) => <Checkbox checked={registered} />,
              });
        }

        if(userType==="mentor"|| userType==="guardian" || userType==="ninja"){
            columns.push({
                title: "Desde",
                dataIndex: "since",
                editable: false,
                render: (since: string) => (
                  <span>{moment(since).format("DD-MM-YYYY")}</span>
                ),
              });
              columns.push({
                title: "Ações",
                key: "actions",
                render: (_: any, record: NinjaItem | GuardianItem | MentorItem )  => {
                  const editable = isEditing(record);
              
                  return editable ? (
                    <span>
                      <Typography.Link
                        onClick={() => save(record.key, userType, form.getFieldsValue())}
                        style={{ marginRight: 8 }}
                      >
                        Guardar
                      </Typography.Link>
                      <Popconfirm title="Tens a certeza que queres cancelar?" onConfirm={cancel}>
                        <a>Cancelar</a>
                      </Popconfirm>
                    </span>
                  ) : (
                    <span>
                      <Link href={`/profile/guardian/${record.key}`}>
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
              }); 
        }
    }
    const mergedColumns = columns.map((col: any) => {
        if (!col.editable) {
          return col;
        }
      
        return {
          ...col,
          onCell: (record: NinjaItem | GuardianItem | MentorItem) => ({
            record,
            inputType: ["verified", "active", "registered"].includes(col.dataIndex)
              ? "checkbox"
              : "string",
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record.key),
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
              dataSource={data}
              columns={mergedColumns}
              pagination={{
                onChange: cancel,
              }}
            />
          </Form>
        </AppLayout>
      );
      